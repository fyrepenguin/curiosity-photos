import React, { Component } from 'react'
import Select from 'react-select'
import ImagesData from './imagesData';
import axios from 'axios';
import Particles from 'react-particles-js'
export default class Form extends Component {

  state = {
    camera: 'all',
    sol: '0',
    manifest: null,
    maxSol: '',
    isLoading: false,
    data: null,
    errors: { camera: "", sol: "" }
  }

  //parameters for particles element
  params = {
    "particles": {
      "number": {
        "value": 100,
        "density": {
          "enable": true
        }
      },
      "size": {
        "value": 3,
        "random": true,
        "anim": {
          "speed": 4,
          "size_min": 0.3
        }
      },
      "line_linked": {
        "enable": false
      },
      "move": {
        "random": true,
        "speed": 1,
        "direction": "top",
        "out_mode": "out"
      }
    },
    "interactivity": {
      "events": {
        "onhover": {
          "enable": true,
          "mode": "bubble"
        },
        "onclick": {
          "enable": true,
          "mode": "repulse"
        }
      },
      "modes": {
        "bubble": {
          "distance": 50,
          "duration": 2,
          "size": 0,
          "opacity": 0.5
        },
        "repulse": {
          "distance": 400,
          "duration": 4
        }
      }
    }
  }

  //options for select element
  options = [
    { value: 'all', label: 'Any' },
    { value: 'FHAZ', label: 'Front Hazard Avoidance Camera' },
    { value: 'RHAZ', label: 'Rear Hazard Avoidance Camera' },
    { value: 'MAST', label: 'Mast Camera' },
    { value: 'CHEMCAM', label: 'Chemistry and Camera Complex' },
    { value: 'MAHLI', label: 'Mars Hand Lens Imager' },
    { value: 'MARDI', label: 'Mars Descent Imager' },
    { value: 'NAVCAM', label: 'Navigation Camera' },
  ]

  //style options for select
  customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderRadius: '0',
      padding: '1rem',
    }),
    control: (provided, state) => ({
      ...provided,
      borderRadius: '3rem',
      padding: '0.5rem 0',
      boxShadow: 'none',
      "&:hover": {
        border: '1px var(--bg) solid'
      }
    }),
    input: (provided, state) => ({
      ...provided,
      padding: '0 1rem'
    }),
    singleValue: (provided, state) => ({
      ...provided,
      paddingLeft: '1rem',
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      marginRight: '1rem',
    }),
  }


  async componentDidMount() {
    await this.getManifest();
  }

  getManifest = () => {
    if (this.state.manifest === null) {
      axios.get('/.netlify/functions/getmanifest')
        .then(({ data }) => this.setState({ manifest: data.photo_manifest, maxSol: data.photo_manifest.max_sol }))
        .catch(err => console.log(err))
    }
  }

  handleSol = (e) => {
    let value = e.target.value
    this.setState({ sol: value })
    //this.setCameras(value);
  }

  /*  setCameras = (v) => {
    for disabling inputs based on sol.
   } */

  handleCamera = (selected) => {
    this.setState({ camera: selected.value })
  }

  validateSol = (value) => {
    if (value === '') {
      this.setState({ errors: { sol: 'Sol is empty/invalid, enter a number' } })
      return false;
    }
    if (value === /D/) {
      this.setState({ errors: { sol: 'Sol contains invalid expressions, enter a valid number' } })
      return false;
    }
    if (value < 0 || value > (this.state.maxSol || 2815)) {
      this.setState({ errors: { sol: `Sol value should be between 0 and ${this.state.maxSol ? this.state.maxSol : 2815}` } })
      return false;
    }
    this.setState({ errors: { sol: '' } })
    return true
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { sol, camera } = this.state;

    if (this.validateSol(sol)) {
      this.setState({ isLoading: true });
      axios.get(`/.netlify/functions/getPhotos?sol=${sol}&camera=${camera}`, { timeout: 5000 })
        .then(({ data }) => (this.setState({ data, isLoading: false })))
        .catch(err => console.log(err))
    }
    return
  }

  render() {
    const { sol, maxSol, data, isLoading, errors } = this.state;


    return (
      <>
        <div className='particle-container'>
          <Particles params={this.params} />
        </div>

        <form className='interactive'>
          <label htmlFor="sol">
            {`Sol / Mars Solar Day`}
            <br />
            <span>
              {`${maxSol ? `(Value from 0 to ${maxSol})` : ''}`}
            </span>
          </label>
          <input className={errors.sol !== '' ? 'error input-sol' : 'input-sol'} type="number" onChange={this.handleSol} value={sol} name="sol" id="sol" min="0" max={maxSol || "2815"} required />
          {errors.sol ? <p className='error-msg'>{errors.sol}</p> : ''}

          <label htmlFor="camera">Camera</label>
          <Select
            className='select'
            options={this.options}
            defaultValue={this.options[0]}
            onChange={this.handleCamera}
            styles={this.customStyles}
            theme={theme => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary: 'var(--bg)',
                primary25: 'var(--bg)',
              }

            })}
          />

          <button type="submit" onClick={this.handleSubmit}>Find Photos</button>
        </form>

        <main>

          {isLoading ?
            (<div className="spinner">
              <div className="bounce1"></div>
              <div className="bounce2"></div>
              <div className="bounce3"></div>
            </div>) :
            <ImagesData data={data} />
          }
          {/*  */}

        </main>
      </>
    )
  }
}