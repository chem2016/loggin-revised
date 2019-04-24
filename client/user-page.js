import React from 'react'
import {connect} from 'react-redux'

const UserPage = () => {
  console.log('coming in userPage')
  return (
    <div className='h100 w100 flex column align-items-center justify-center'>
      <div className='flex'>
        <img className='rounded mr1' />
        <h1>Welcome back!</h1>
      </div>
      <div>
        <button className='btn bg-red white p1 rounded'>Logout</button>
      </div>
    </div>
  )
}

const mapStateToProps = ({ user }) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPage)
