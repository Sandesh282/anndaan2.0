import React from 'react';

const deliveries = [
  {
    id: 'DLV-001',
    recipient: 'Amit Sharma',
    address: '123 MG Road, Hyderabad, TS',
    status: 'Delivered',
    time: '2025-06-12 10:30 AM',
  },
  {
    id: 'DLV-002',
    recipient: 'Sita Verma',
    address: '56 Park Street, Hyderabad, TS',
    status: 'In Transit',
    time: '2025-06-12 01:15 PM',
  },
  {
    id: 'DLV-003',
    recipient: 'Rahul Kapoor',
    address: '789 Sector 5, Hyderabad, TS',
    status: 'Pending',
    time: 'ETA: 2025-06-12 03:00 PM',
  },
  {
    id: 'DLV-004',
    recipient: 'Neha Singh',
    address: 'Plot 24, Andheri East, Hyderabad, TS',
    status: 'Delivered',
    time: '2025-06-12 11:45 AM',
  },
  {
    id: 'DLV-005',
    recipient: 'Karan Joshi',
    address: 'Flat 9B, Jubilee Hills, Hyderabad, TS',
    status: 'In Transit',
    time: '2025-06-12 02:30 PM',
  },
];

const getStatusStyle = (status) => {
  switch (status) {
    case 'Delivered':
      return { color: 'green', fontWeight: 'bold' };
    case 'In Transit':
      return { color: '#007bff', fontWeight: 'bold' };
    case 'Pending':
      return { color: '#ffa500', fontWeight: 'bold' };
    default:
      return {};
  }
};

const Dashboard = () => {
  const total = deliveries.length;
  const delivered = deliveries.filter(d => d.status === 'Delivered').length;
  const inTransit = deliveries.filter(d => d.status === 'In Transit').length;
  const pending = deliveries.filter(d => d.status === 'Pending').length;

  const styles = {
    container: {
      fontFamily: 'Segoe UI, sans-serif',
      backgroundColor: '#f4f6f8',
      padding: '40px 20px',
      minHeight: '100vh',
    },
    header: {
      textAlign: 'center',
      color: '#222',
      marginBottom: '20px',
    },
    summary: {
      display: 'flex',
      justifyContent: 'space-around',
      marginBottom: '30px',
      flexWrap: 'wrap',
      gap: '20px',
    },
    card: {
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
      width: '200px',
      textAlign: 'center',
    },
    cardLabel: {
      fontSize: '14px',
      color: '#555',
    },
    cardValue: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginTop: '5px',
    },
    tableContainer: {
      overflowX: 'auto',
    },
    table: {
      width: '100%',
      maxWidth: '1000px',
      margin: '0 auto',
      borderCollapse: 'collapse',
      backgroundColor: '#fff',
      boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
    },
    th: {
      backgroundColor: '#222',
      color: 'white',
      padding: '14px',
      textAlign: 'left',
      fontSize: '15px',
    },
    td: {
      padding: '12px',
      borderBottom: '1px solid #ddd',
      fontSize: '14px',
      color: '#333',
    },
    footer: {
      marginTop: '40px',
      textAlign: 'center',
      fontSize: '13px',
      color: '#777',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Delivery Tracking Dashboard</h1>

      <div style={styles.summary}>
        <div style={styles.card}>
          <div style={styles.cardLabel}>Total Deliveries</div>
          <div style={styles.cardValue}>{total}</div>
        </div>
        <div style={styles.card}>
          <div style={styles.cardLabel}>Delivered</div>
          <div style={styles.cardValue} style1={{ ...styles.cardValue, color: 'green' }}>{delivered}</div>
        </div>
        <div style={styles.card}>
          <div style={styles.cardLabel}>In Transit</div>
          <div style={styles.cardValue} style2={{ ...styles.cardValue, color: '#007bff' }}>{inTransit}</div>
        </div>
        <div style={styles.card}>
          <div style={styles.cardLabel}>Pending</div>
          <div style={styles.cardValue} style3={{ ...styles.cardValue, color: '#ffa500' }}>{pending}</div>
        </div>
      </div>

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Delivery ID</th>
              <th style={styles.th}>Recipient</th>
              <th style={styles.th}>Address</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {deliveries.map((delivery) => (
              <tr key={delivery.id}>
                <td style={styles.td}>{delivery.id}</td>
                <td style={styles.td}>{delivery.recipient}</td>
                <td style={styles.td}>{delivery.address}</td>
                <td style={{ ...styles.td, ...getStatusStyle(delivery.status) }}>
                  {delivery.status}
                </td>
                <td style={styles.td}>{delivery.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={styles.footer}>Last updated: June 12, 2025 · Volunteer ID #VLT123</div>
    </div>
  );
};

export default Dashboard;
