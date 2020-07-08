import React, { Component } from 'react'
import Select from 'react-select'
import ImagesContainer from './imagesContainer';
import axios from 'axios';

export default class Form extends Component {

  state = {
    camera: 'all',
    sol: '0',
    manifest: null,
    maxSol: '',
    isLoading: true,
    data: null,
    page: 1,
    errors: { camera: "", sol: "" }
  }
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
    if (value < 0 || value >= (this.state.maxSol || 2815)) {
      this.setState({ errors: { sol: `Sol value should be between 0 and ${this.state.maxSol ? this.state.maxSol : 2815}` } })
      return false;
    }
    this.setState({ errors: { sol: '' } })
    return true
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ isLoading: true });
    const { sol, camera } = this.state;

    if (this.validateSol(sol)) {
      axios.get(`/.netlify/functions/getPhotos?sol=${sol}&camera=${camera}`)
        .then(({ data }) => (this.setState({ data, isLoading: false })))
        .catch(err => console.log(err))
    }
    return
  }

  render() {
    const { sol, maxSol, data, isLoading, errors } = this.state;

    return (
      <>

        <form>
          <label htmlFor="sol">
            {`Sol / Mars Solar Day`}
            <br />
            <span>
              {`${maxSol ? `(Value from 0 to ${maxSol})` : ''}`}
            </span>
          </label>
          <input className={errors.sol !== '' ? 'error' : ''} type="number" onChange={this.handleSol} value={sol} name="sol" id="sol" min="0" max={maxSol || "2815"} required />
          {errors.sol ? <p className='error-msg'>{errors.sol}</p> : ''}

          <label htmlFor="camera">Camera</label>
          <Select className='select' options={this.options} defaultValue={this.options[0]} onChange={this.handleCamera} required />

          <button type="submit" onClick={this.handleSubmit}>Find Photos</button>
        </form>

        <main>

          {
            /**
           * TODO: Refactor loading and error component
            */
          }
          {!isLoading ?
            data ?
              data.photos.length !== 0 ?
                <ImagesContainer data={data} /> : <p className='info'> No photos on that day with the selected camera. Try changing camera type or date</p> : <p className='info'> Loading</p> : <p className='info'> Please Select Date and Camera</p>}
        </main>
      </>
    )
  }
}

/*
1. Curiosity didnt take any photos on the day you specified
2. Curiosity didnt take any photos on the day with camera you specified
*/
