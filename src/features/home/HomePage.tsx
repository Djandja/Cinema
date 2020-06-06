import React from 'react'
import { Container, Segment, Header, Button, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

 const HomePage = () => {
    return (
        // <Container style={{marginTop: '7e'}}> 
        //     <h1>Home page</h1>
        //     <h3>Go to <Link to='/projections'>
        //     Projections
        //     </Link></h3>
        // </Container>
            <Segment inverted textAlign='center' vertical className='masthead' >
                <Container text>
                    <Header as='h1' inverted>
                        <Image
                        style={{flex:1, height: undefined, width: undefined}}
                         src='/assets/cat.png' alt='logo'
                         resizeMode="cover"
                         />
                        
                    </Header>
                    <Header as='h2' inverted content='Welcome to MovieStar cinema' />
                    <Button as={Link} to='/projections' size='huge' inverted>
                        Movies!
                    </Button>
                </Container>
            </Segment>
    );
};

export default HomePage
