import React from 'react';

export function KnotStudioMeeting() {
  return (
    <div 
      style={{
        backgroundColor: '#000',
        width: '100%',
        height: '220px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        borderRadius: '4px'
      }}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: '20px'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            backgroundColor: '#4CAF50', 
            borderRadius: '50%', 
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>NS</div>
          <div style={{ fontSize: '10px', marginTop: '4px' }}>Team Member</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            backgroundColor: '#2196F3', 
            borderRadius: '50%', 
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>SM</div>
          <div style={{ fontSize: '10px', marginTop: '4px' }}>Team Member</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            backgroundColor: '#9C27B0', 
            borderRadius: '50%', 
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>AT</div>
          <div style={{ fontSize: '10px', marginTop: '4px' }}>Team Member</div>
        </div>
      </div>
      
      <div style={{
        width: '80%',
        height: '120px',
        backgroundColor: '#333',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '4px'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontWeight: 'bold', fontSize: '16px' }}>The Knot Studio</div>
          <div style={{ fontSize: '14px', marginTop: '8px' }}>Meeting Representation</div>
        </div>
      </div>
    </div>
  );
}

export function DSSMeeting() {
  return (
    <div 
      style={{
        backgroundColor: '#f5f5f5',
        width: '100%',
        height: '220px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#333',
        borderRadius: '4px'
      }}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: '20px'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            backgroundColor: '#FF5722', 
            borderRadius: '4px', 
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white'
          }}>SD</div>
          <div style={{ fontSize: '10px', marginTop: '4px' }}>Team Member</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            backgroundColor: '#FF9800', 
            borderRadius: '4px', 
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white'
          }}>VV</div>
          <div style={{ fontSize: '10px', marginTop: '4px' }}>Team Member</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            backgroundColor: '#795548', 
            borderRadius: '4px', 
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white'
          }}>DV</div>
          <div style={{ fontSize: '10px', marginTop: '4px' }}>Team Member</div>
        </div>
      </div>
      
      <div style={{
        width: '80%',
        height: '120px',
        backgroundColor: '#e0e0e0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '4px',
        border: '1px solid #ccc'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontWeight: 'bold', fontSize: '16px' }}>Dassault Systems</div>
          <div style={{ fontSize: '14px', marginTop: '8px' }}>Meeting Representation</div>
        </div>
      </div>
    </div>
  );
}