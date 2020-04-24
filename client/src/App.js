import React, { Component } from "react";
import CommunityLoans from "./contracts/CommunityLoans.json";
import getWeb3 from "./getWeb3";
import Particles from "react-particles-js";
import { Button,Container, Row, Col, Form,Alert, Spinner } from 'react-bootstrap';


import "./App.css";

class App extends Component {
  state = { etherValue: 0,
     web3: null, 
     accounts: null, contract: null,description:'', loading: true,recontributeEth: 1 , claimVal: 1};

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = CommunityLoans.networks[networkId];
      const instance = new web3.eth.Contract(
        CommunityLoans.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    try {
      const response = await contract.methods.escrowBalance().call();
      const isMember = await contract.methods.contributors(accounts[0]).call();
      const claim = await contract.methods.claim().call();
      // Update state with the result.
      this.setState({ etherValue: response, isMember, claim , loading: false});
    } catch (error) {
      this.setState({error: true, loading: false})
      console.log(error)
    }

  };

  becomeMember =  async () => {
    const { web3,accounts, contract } = this.state;
    this.setState({loading: true})
    try {
        await contract.methods.becomeMember().send({from : accounts[0], value: web3.utils.toWei("1", "ether")})
        const etherValue = await contract.methods.escrowBalance().call();
        const isMember = await contract.methods.contributors(accounts[0]).call();
        this.setState({isMember,etherValue, error: false, loading: false});
    } catch (error) {
      this.setState({error: true, loading: false})
        console.log(error)
    }
    
  }

  recontribute =  async () => {
    const { accounts, contract, web3,recontributeEth,errorMsg } = this.state;
    this.setState({loading: true})
    try {
        await contract.methods.rePay().send({from : accounts[0], value: web3.utils.toWei(recontributeEth.toString(), "ether"),gas: 3000000});
        const etherValue = await contract.methods.escrowBalance().call();
        this.setState({etherValue,loading: false});
    } catch (error) {
      this.setState({error: true, loading: false})
        console.log(error)
    }
    
  }

  creatClaimRequest = async () => {
    const { accounts, contract, description,claimVal,web3,etherValue }= this.state;
    if(claimVal > etherValue){
      this.setState({error: true, errorMsg: "You can't claim more than balance of the contract"});
      return;
    }
    this.setState({loading: true})
    try {
        await contract.methods.createRequest(description, web3.utils.toWei(claimVal.toString(), "ether")).send({from : accounts[0], gas: 3000000});
        const claim = await contract.methods.claim().call();
        this.setState({claim,loading: false});
    } catch (error) {
       this.setState({error: true, loading: false})
        console.log(error)
    }

  }
  
  approve = async () => {
    const { accounts, contract} = this.state;
    this.setState({loading: true})
    try {
        await contract.methods.approveClaim().send({from : accounts[0], gas: 3000000});
        const claim = await contract.methods.claim().call();
        const etherValue = await contract.methods.escrowBalance().call();
        this.setState({etherValue,claim,loading: false});
    } catch (error) {
       this.setState({error: true, loading: false})
        console.log(error)
    }
  }
  reject = async () => {
    const { accounts, contract} = this.state;
    this.setState({loading: true})
    try {
        await contract.methods.rejectClaim().send({from : accounts[0], gas: 3000000});
        const claim = await contract.methods.claim().call();
        const etherValue = await contract.methods.escrowBalance().call();
        this.setState({etherValue,claim,loading: false});
    } catch (error) {
       this.setState({error: true, loading: false})
        console.log(error)
    }
  }

  render() {
    const {
      isMember,
      web3,
      etherValue, 
      description,
      claim,
      accounts,
      error, 
      loading,
      recontributeEth,
      claimVal,
      errorMsg
    } = this.state;
    if (!web3 || loading) {
      return <div className='spinner-container'>
        <Spinner animation="grow" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
    </div>
    }
    return (
      <div className="App">
      <Particles
      params={{
        detectRetina: true,
        fpsLimit : 30,
        pauseOnBlur : true,
        particles: {
          number: {
            value: 80,
            density: {
              enable: true,
              value_area: 700
            }
          },
          color: {
            value: "#1d2231"
          },
          shape: {
            type: "circle",
            stroke: {
              width: 0,
              color: "#fff"
            },
            polygon: {
              nb_sides: 5
            }
          },
          opacity: {
            value: 1,
            random: false,
            anim: {
              enable: false,
              speed: 1,
              opacity_min: 0.1,
              sync: false
            }
          },
          size: {
            value: 3,
            random: true,
            anim: {
              enable: false,
              speed: 30,
              size_min: 0.1,
              sync: false
            }
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.4,
            width: 1
          },
          move: {
            enable: true,
            speed: 6,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200
            }
          }
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: {
              enable: true,
              mode: "grab"
            },
            onclick: {
              enable: false,
              mode: "push"
            },
            resize: true
          },
          modes: {
            connect: {
              distance: 40,
              lineLinked: {
                opacity: 0.5
              },
              radius: 40
            },
            grab: {
              distance: 140,
              line_linked: {
                opacity: 1
              }
            },
            bubble: {
              distance: 400,
              size: 40,
              duration: 2,
              opacity: 8,
              speed: 3
            },
            repulse: {
              distance: 200,
              duration: 0.4
            },
            push: {
              particles_nb: 4
            },
            remove: {
              particles_nb: 2
            }
          }
        },
        retina_detect: true
    }} />
    
    <Container fluid >
    <Row>
      <Col className="header">
      <h1>PIGGYBANK</h1>
      </Col>
    </Row>
  <Row>
  <Col></Col>
    <Col xs={6} className="form-container">
         <Container className="claim-sub-container">
        <Row>
          <Col>
          <h5>Contract currently has {web3.utils.fromWei(etherValue.toString(), 'ether')} Ether</h5>
          </Col>
        </Row>
      </Container>
   
       {isMember ?
           <Container className="claim-sub-container">
         <Row>
           <Col>

          <Form.Group controlId="Contribution">
      <Form.Label>Contribution Value</Form.Label>
      <Form.Control  
      type="number" 
      value={recontributeEth} 
      placeholder="Enter value of your contribution in ether"  
      onChange={(e) => this.setState({recontributeEth: e.target.value})}
      />
      <Form.Text className="text-muted">
      Enter value of your contribution in ether
      </Form.Text>
    </Form.Group>
   
           </Col>

           
         </Row>
         <Row>
<Col>
<Button  variant="primary" onClick={() => this.recontribute()}>
         Re-contribute
       </Button> 
       </Col>
         </Row>

       </Container>:  
          <Container className="claim-sub-container">
         <Row>
           <Col>
           <Button  variant="primary" onClick={() => this.becomeMember()}>
         Become a Member of the Crypto Loss Pool!
       </Button> 
           </Col>
         </Row>
       </Container>
       }
       
        <div>
          {isMember && (
            <>
               {claim && claim.active ? (
                <>
                <Container className="claim-sub-container">
                  <Row>
                    <Col>
                    <p>There is an active claim {claim.recipient === accounts[0] ? " by you ": ""} that needs approval</p>

                    </Col>
                  </Row>
                  <Row>
                    <Col>
                    <p>Claimer address: {claim.recipient}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                    <p>Claim value: {web3.utils.fromWei(claim.value.toString(), 'ether')} Ether </p>

                    </Col>
                  </Row>
                  <Row>
                    <Col>
                    <p>Claim description: {claim.description}</p>
                    </Col>
                  </Row>

                </Container>


              {claim.recipient === accounts[0] ?        <Container className="claim-sub-container">
                  <Row>
                    <Col><p>Nobody has approved or rejected your claim yet, money will be transfered to your account on approval, or claim will be deleted on rejection</p>  </Col> 
                  </Row>

                </Container> : 
                  <Container className="claim-sub-container">
                 <Row>
                   <Col>
                   <Button  variant="success" className="btns"  onClick={() => this.approve()}>Approve</Button>
                   <Button  variant="danger" className="btns"   onClick={() => this.reject()}>Reject</Button>
                   </Col>

                 </Row>
               </Container>
                       
              }
             
    
                </>
              ):               <Container className="claim-sub-container">
              <Row>
                <Col xs={6}>
     
               <Form.Group controlId="claimval">
           <Form.Label>Claim Value</Form.Label>
           <Form.Control  
           type="number" 
           value={claimVal} 
           placeholder="Enter value of your claim in Ether"  
           onChange={(e) => this.setState({claimVal: e.target.value})}
           />
           <Form.Text className="text-muted">
           Enter value of your claim in Ether
           </Form.Text>
         </Form.Group>
        
                </Col>
                <Col xs={6}>
                <Form.Group controlId="claimdesc">
           <Form.Label>Claim description</Form.Label>
           <Form.Control  
           type="text" 
           value={description} 
           placeholder="Enter description of your claim"
           onChange={(e) => this.setState({description: e.target.value})}
           />
           <Form.Text className="text-muted">
           Enter description of your claim
           </Form.Text>
         </Form.Group>
                </Col>
     
                
              </Row>
              
              <Row>
                <Col>
                <Button  variant="primary" onClick={() => this.creatClaimRequest()}>Create a claim</Button>

                </Col>

              </Row>
      
              </Container>  }
              </>
          )
          }
                 <br />       <br /> 
                 { error &&     <Container className="claim-sub-container">
              <Row>
                <Col>
     
                 <Alert variant="danger" onClose={() => this.setState({error: false, errorMsg: ""})} dismissible>
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>
        {errorMsg || "Some error occured during contract interaction please try again."}
        </p>
      </Alert>
        </Col>

        </Row>

        </Container> 
  }
        </div>
    </Col>
    <Col></Col>
  </Row>
</Container>

      </div>
    );
  }
}

export default App;
