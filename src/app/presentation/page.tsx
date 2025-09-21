import React from 'react'

const page = () => {
  return (
    <div style={{ width:'100vw', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0px' }}>
      
        <iframe
          loading="lazy"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            border: 'none',
            padding: 0,
            margin: 0,
            borderRadius: 8,
          }}
          src="https://www.canva.com/design/DAGzUf8yBy0/HHWcDop-MvTfa-Iy8b4axw/view?embed"
          allowFullScreen
          title="Final presentation Outlfy"
        />
     
    </div>
  )
}

export default page
