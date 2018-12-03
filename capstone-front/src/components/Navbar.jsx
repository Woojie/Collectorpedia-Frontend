import React from 'react'
import { Link } from 'react-router-dom'
import '../App.css';
import {Menu, Segment, Image, Header } from 'semantic-ui-react' 



const Navbar = ({logout, loggedIn, username}) => {
    let welcome = username === null ? ""      
    : <Header as='h2' inverted content={`${username}'s Collection`} />

    return (

        <Segment inverted>
        {loggedIn ? (
          <Menu inverted pointing secondary stackable>
          <Menu.Item>
            <Image src="/images/logo.png"  />
          </Menu.Item>
          <Menu.Item>
          {welcome}
          </Menu.Item>
          <Menu.Item as='label' name='logout' onClick={logout} position='right' >
            <Link to='/'>
              Logout
            </Link>  
          </Menu.Item>
          </Menu>
        ) :(
      <div>
        <Menu inverted pointing secondary>
          <Menu.Item>
            <Image src="/images/logo.png"  />
          </Menu.Item>
            <Menu.Item  name='login' position='right'>
              <Link to='/'>
                Login
              </Link>
            </Menu.Item>

          <Link to='/signup'>
            <Menu.Item
              name='signup'
            />
          </Link>
          </Menu>
          </div>
        )
        }
        </Segment>

    )
    
}

export default Navbar