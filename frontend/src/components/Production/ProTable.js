import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LinearProgress, Box, Typography } from '@mui/material';
import { SentimentVeryDissatisfied, SentimentDissatisfied, SentimentSatisfiedAlt, SentimentVerySatisfied } from '@mui/icons-material';

export default function ProTable() {
  const [progressList, setProgressList] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // State for the search query
  const navigate = useNavigate();

  // Function to fetch production progress data from the server
  const fetchProgressList = async () => {
    try {
      const response = await fetch('http://localhost:8070/test4/progress');
      if (response.ok) {
        const data = await response.json();
        setProgressList(data);
      } else {
        console.error('Failed to fetch progress list');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Fetch progress list when the component mounts
  useEffect(() => {
    fetchProgressList();
  }, []);

  // Function to handle updating a progress entry
  const handleUpdate = (progress) => {
    console.log('Navigating to update form with progress:', progress); // Debugging line
    navigate('/dashproform', { state: { progress } });
  };

  // Function to handle deleting a progress entry
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8070/test4/delete/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchProgressList(); // Refresh the table after deletion
        alert('Progress entry deleted successfully');
      } else {
        alert('Failed to delete progress entry');
      }
    } catch (error) {
      console.error('Error deleting progress entry:', error);
      alert('An error occurred while deleting the progress entry.');
    }
  };

  // Function to determine which icon to display based on percentage
  const getIcon = (percentage) => {
    if (percentage >= 90) {
      return <SentimentVerySatisfied sx={{ color: '#4caf50' }} />;
    } else if (percentage >= 75) {
      return <SentimentSatisfiedAlt sx={{ color: '#8bc34a' }} />;
    } else if (percentage >= 50) {
      return <SentimentDissatisfied sx={{ color: '#ffeb3b' }} />;
    } else {
      return <SentimentVeryDissatisfied sx={{ color: '#f44336' }} />;
    }
  };

  // Filter the progress entries based on the search query
  const filteredProgressList = progressList.filter((progress) =>
    progress.lname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ marginBottom: '20px', color: '#000000', textAlign: 'center' }}>Production Progress List</h1>

      {/* Search bar */}
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <input
          type="text"
          placeholder="Search by Line Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: '10px',
            width: '300px',
            borderRadius: '5px',
            border: '1px solid #ccc'
          }}
        />
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #000000', backgroundColor: '#FFFFFF' }}>
        <thead>
          <tr style={{ backgroundColor: '#7D2CE0', color: '#FFFFFF' }}>
            <th style={{ border: '1px solid #000000', padding: '12px' }}>Line Name</th>
            <th style={{ border: '1px solid #000000', padding: '12px' }}>Material Used</th>
            <th style={{ border: '1px solid #000000', padding: '12px' }}>Cutting</th>
            <th style={{ border: '1px solid #000000', padding: '12px' }}>Molding</th>
            <th style={{ border: '1px solid #000000', padding: '12px' }}>Vulcanization</th>
            <th style={{ border: '1px solid #000000', padding: '12px' }}>Good Units</th>
            <th style={{ border: '1px solid #000000', padding: '12px' }}>Defective Units</th>
            <th style={{ border: '1px solid #000000', padding: '12px' }}>Quality</th>
            <th style={{ border: '1px solid #000000', padding: '12px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProgressList.map((progress) => {
            const totalUnits = progress.lgoodunit + progress.lDefectiveunit;
            const goodPercentage = totalUnits > 0 ? (progress.lgoodunit / totalUnits) * 100 : 0;

            return (
              <tr key={progress._id}>
                <td style={{ border: '1px solid #000000', padding: '12px' }}>{progress.lname}</td>
                <td style={{ border: '1px solid #000000', padding: '12px' }}>{progress.lmaterial}</td>
                <td style={{ border: '1px solid #000000', padding: '12px' }}>{progress.lcutting}</td>
                <td style={{ border: '1px solid #000000', padding: '12px' }}>{progress.lmolding}</td>
                <td style={{ border: '1px solid #000000', padding: '12px' }}>{progress.lVulcanization}</td>
                <td style={{ border: '1px solid #000000', padding: '12px' }}>{progress.lgoodunit}</td>
                <td style={{ border: '1px solid #000000', padding: '12px' }}>{progress.lDefectiveunit}</td>
                <td style={{ border: '1px solid #000000', padding: '12px' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LinearProgress
                      variant="determinate"
                      value={goodPercentage}
                      sx={{ width: '100%', marginRight: '10px' }}
                    />
                    {getIcon(goodPercentage)}
                  </Box>
                  <Typography variant="caption" display="block" sx={{ textAlign: 'center', marginTop: '5px' }}>
                    {goodPercentage.toFixed(2)}%
                  </Typography>
                </td>
                <td style={{ border: '1px solid #000000', padding: '12px', textAlign: 'center' }}>
                  <button
                    onClick={() => handleUpdate(progress)}
                    style={{
                      padding: '8px 12px',
                      backgroundColor: '#007bff',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      marginRight: '8px'
                    }}
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(progress._id)}
                    style={{
                      padding: '8px 12px',
                      backgroundColor: '#dc3545',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer'
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}