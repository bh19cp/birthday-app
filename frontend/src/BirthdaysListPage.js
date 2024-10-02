import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Box,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import Header from './Header';
import './styles/DialogStyle.css';

const BirthdaysListPage = () => {
  const [birthdays, setBirthdays] = useState([]);
  const [open, setOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDOB, setNewDOB] = useState(null);
  const [editId, setEditId] = useState(null); // New state to track editing birthday
  const today = dayjs();

  useEffect(() => {
    fetchBirthdays();
  }, []);

  const fetchBirthdays = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/birthdays');
      setBirthdays(response.data);
    } catch (error) {
      console.error('Error fetching birthdays:', error);
    }
  };

  const handleAddBirthdayClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewName('');
    setNewDOB(null);
  };

  const handleSave = async () => {
    try {
      if (newName && newDOB) {
        const formattedDOB = newDOB.format('YYYY-MM-DD');
        await axios.post('http://localhost:8080/api/birthdays', {
          name: newName,
          date: formattedDOB,
        });
        fetchBirthdays();
        handleClose();
      }
    } catch (error) {
      console.error('Error adding birthday:', error);
    }
  };

  const handleEditClick = (birthday) => {
    setEditId(birthday.birthdayId);
    setNewName(birthday.name);
    setNewDOB(dayjs(birthday.date));
  };

  const handleSaveEdit = async (birthdayId) => {
    try {
      if (newName && newDOB) {
        const formattedDOB = newDOB.format('YYYY-MM-DD');
        await axios.put(`http://localhost:8080/api/birthdays/${birthdayId}`, {
          name: newName,
          date: formattedDOB,
        });
        setEditId(null);
        fetchBirthdays();
      }
    } catch (error) {
      console.error('Error updating birthday:', error);
    }
  };

  const handleDeleteBirthday = async (birthdayId) => {
    try {
      await axios.delete(`http://localhost:8080/api/birthdays/${birthdayId}`);
      setBirthdays(birthdays.filter((birthday) => birthday.birthdayId !== birthdayId));
    } catch (error) {
      console.error('Error deleting birthday:', error);
    }
  };

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Header />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          width: '100%',
          maxWidth: '1200px',
          marginTop: '20px',
        }}
      >
        <Paper elevation={3} sx={{ flexGrow: 1 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell><strong>Date of Birth</strong></TableCell>
                <TableCell><strong>Current age</strong></TableCell>
                <TableCell><strong>Days until birthday</strong></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {birthdays.map((birthday) => (
                <TableRow key={birthday.birthdayId}>
                  <TableCell>
                    {editId === birthday.birthdayId ? (
                      <TextField
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        fullWidth
                      />
                    ) : (
                      birthday.name
                    )}
                  </TableCell>
                  <TableCell>
                    {editId === birthday.birthdayId ? (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          value={newDOB}
                          onChange={(date) => setNewDOB(date)}
                          maxDate={today}
                          renderInput={(params) => <TextField {...params} fullWidth />}
                        />
                      </LocalizationProvider>
                    ) : (
                      dayjs(birthday.date, 'YYYY-MM-DD').format('DD-MM-YYYY')
                    )}
                  </TableCell>
                  <TableCell>{birthday.currentAge}</TableCell>
                  <TableCell>{birthday.daysUntilBirthday}</TableCell>
                  <TableCell>
                    {editId === birthday.birthdayId ? (
                      <>
                        <Button onClick={() => handleSaveEdit(birthday.birthdayId)} color="primary">
                          Save
                        </Button>
                        <Button onClick={() => setEditId(null)} color="secondary">
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <IconButton
                          color="primary"
                          onClick={() => handleEditClick(birthday)}
                          sx={{ borderRadius: '50%', marginRight: '10px' }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="secondary"
                          onClick={() => handleDeleteBirthday(birthday.birthdayId)}
                          sx={{ borderRadius: '50%' }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
        <Box sx={{ marginLeft: '20px', display: 'flex', alignItems: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddCircleIcon />}
            onClick={handleAddBirthdayClick}
            sx={{ whiteSpace: 'nowrap' }}
          >
            Add birthday
          </Button>
        </Box>
      </Box>

      <Dialog 
        open={open} 
        onClose={handleClose} 
        classes={{ paper: 'custom-dialog' }}
      >
        <DialogTitle className="custom-dialog-title">Add New Birthday</DialogTitle>
        <DialogContent className="custom-dialog-content">
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date of Birth"
              value={newDOB}
              onChange={(date) => setNewDOB(date)}
              maxDate={today}
              renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
            />
          </LocalizationProvider>
        </DialogContent>
        <DialogActions className="custom-dialog-actions">
          <Button onClick={handleClose} color="secondary">Cancel</Button>
          <Button onClick={handleSave} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default BirthdaysListPage;
