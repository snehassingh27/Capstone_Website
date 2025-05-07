import React from 'react';

export default function KnotStudioMeeting() {
  return (
    <svg width="100%" height="300" viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="600" height="300" fill="#000" />
      <foreignObject x="50" y="10" width="500" height="240">
        <div xmlns="http://www.w3.org/1999/xhtml" style={{
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          backgroundColor: '#000'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            marginBottom: '10px',
            padding: '5px'
          }}>
            <div style={{
              padding: '5px',
              border: '2px solid #4ade80',
              borderRadius: '5px',
              margin: '0 5px'
            }}>
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80" 
                alt="Team member"
                style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '50%' }}
              />
              <div style={{ color: 'white', fontSize: '10px', textAlign: 'center' }}>Team Member</div>
            </div>
            <div style={{
              padding: '5px',
              margin: '0 5px'
            }}>
              <img 
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80" 
                alt="Team member"
                style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '50%' }}
              />
              <div style={{ color: 'white', fontSize: '10px', textAlign: 'center' }}>Team Member</div>
            </div>
          </div>
          <div style={{
            width: '70%',
            height: '180px',
            backgroundColor: '#333',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: '16px',
              textAlign: 'center'
            }}>
              The Knot Studio<br />
              Meeting Representation
            </div>
          </div>
        </div>
      </foreignObject>
    </svg>
  );
}