import React, { Component } from 'react'
import Select from 'react-select'
import ImagesContainer from './imagesContainer';

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
      fetch('/.netlify/functions/getmanifest')
        .then(res => res.json())
        .then(({ photo_manifest }) => this.setState({ manifest: photo_manifest, maxSol: photo_manifest.max_sol }))
        .catch(err => console.error(err))
    }

  }
  handleSol = (e) => {
    let value = e.target.value
    if (value >= 0 && value <= (this.state.maxSol || 2800)) {
      this.setState({ sol: value })
      //this.setCameras(value);
    }
  }

  /*  setCameras = (v) => {
    for disabling inputs based on sol.
   } */

  handleCamera = (selected) => {
    this.setState({ camera: selected.value })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ isLoading: true });
    const { sol, camera } = this.state;

    fetch(`/.netlify/functions/getPhotos?sol=${sol}&camera=${camera}`)
      .then(res => res.json())
      .then(resJson => {
        this.setState({ data: resJson })
      }
      )
      .then(this.setState({ isLoading: false })).catch(err => console.error(err))
  }

  render() {
    const { sol, maxSol, data, isLoading } = this.state;

    return (
      <>
        <h1>
          Mars Curiosity Rover Photo Viewer
        </h1>
        <form>
          <label htmlFor="sol">{`Sol/ Mars Solar Day ${maxSol ? `(Value from  to ${maxSol})` : ''}`}</label>
          <input type="number" onChange={this.handleSol} value={sol} name="sol" id="sol" min="0" max={maxSol || "2800"} />

          <label htmlFor="camera">Camera</label>
          <Select className='select' options={this.options} defaultValue={this.options[0]} onChange={this.handleCamera} />

          <button type="submit" onClick={this.handleSubmit}>Submit</button>
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
