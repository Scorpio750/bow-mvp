import React from 'react';

const NotFound = (props) => {
  console.log(props)
  return (
    <>
      <h1>404. Sorry, our servers couldn't find your requested URL {props.location.pathname}</h1>
      <img src="thick-logo.png" alt="bow-web-banner" />
    </>
  )
}
export default NotFound;
