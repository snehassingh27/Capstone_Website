import React from 'react';

export default function DSSMeeting() {
  return (
    <svg width="100%" height="300" viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="600" height="300" fill="#f0f0f0" />
      <foreignObject x="50" y="10" width="500" height="240">
        <div xmlns="http://www.w3.org/1999/xhtml" style={{
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          backgroundColor: '#f0f0f0'
        }}>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '10px',
            width: '100%',
            padding: '5px',
            marginBottom: '10px'
          }}>
            <div style={{ textAlign: 'center' }}>
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80" 
                alt="Team member"
                style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '5px' }}
              />
              <div style={{ fontSize: '10px' }}>Team Member</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80" 
                alt="Team member"
                style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '5px' }}
              />
              <div style={{ fontSize: '10px' }}>Team Member</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <img 
                src="https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80" 
                alt="Team member"
                style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '5px' }}
              />
              <div style={{ fontSize: '10px' }}>Team Member</div>
            </div>
          </div>
          <div style={{
            width: '70%',
            height: '140px',
            backgroundColor: '#e0e0e0',
            border: '1px solid #ccc',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{
              color: '#333',
              fontWeight: 'bold',
              fontSize: '16px',
              textAlign: 'center'
            }}>
              Dassault Systems<br />
              Meeting Representation
            </div>
          </div>
        </div>
      </foreignObject>
    </svg>
  );
}