import React, { Component } from 'react'
import Select from 'react-select'
import ImagesContainer from './imagesContainer';
//const APIKEY = process.env.REACT_APP_API_KEY;

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
    { value: 'all', label: 'All' },
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
    console.log('data loaded')
  }


  getManifest = () => {
    if (this.state.manifest === null) {
      fetch('/.netlify/functions/getmanifest')
        .then(res => res.json())
        .then(({ photo_manifest }) => this.setState({ manifest: photo_manifest, maxSol: photo_manifest.max_sol }))
        .catch(err => console.log(err))
    }

  }
  handleSol = (e) => {
    let value = e.target.value
    if (value >= 0 && value <= this.state.maxSol) {
      this.setState({ sol: value })
      //this.setCameras(value);
    }
  }

  /*  setCameras = (v) => {
    for disabling inputs based on sol.
   } */

  handleCamera = (selected) => {
    console.log(selected)
    this.setState({ camera: selected.value })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ isLoading: true });
    const { sol, camera } = this.state;
    console.log("sol  " + sol, camera)
    let url = `/.netlify/functions/getPhotos?sol=${sol}&camera=${camera}`;

    /*   if (camera === 'all') {
        url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${sol}&page=1&api_key=${APIKEY}`;
      } else {
        url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${sol}&page=1&camera=${camera}&api_key=${APIKEY}`;
      } */

    fetch(url)
      .then(res => res.json())
      .then(resJson => {
        this.setState({ data: resJson })
      }
      )
      .then(this.setState({ isLoading: false }))
  }

  render() {
    const { sol, maxSol, data, isLoading } = this.state;

    return (
      <main>
        <h1>
          Mars Curiosity Rover Photo Viewer
        </h1>



        <form>

          <label htmlFor="sol">{`Sol ${maxSol ? `(Value from  to ${maxSol})` : ''}`}</label>
          <input type="number" onChange={this.handleSol} value={sol} name="sol" id="sol" min="0" max={maxSol} />

          <label htmlFor="camera">Camera</label>
          <Select className='select' options={this.options} defaultValue={this.options[0]} onChange={this.handleCamera} />

          <button type="submit" onClick={this.handleSubmit}>Submit</button>

        </form>

        <main>
          {
  /**
 * TODO: Refactor loading and error component
  */}
          {!isLoading ?
            data ?
              data.photos.length !== 0 ?
                <ImagesContainer data={data} /> : <p className='info'> No photos on that day with the selected camera. Try changing camera type or date</p> : <p className='info'> Loading</p> : <p className='info'> Please Select Date and Camera</p>}
        </main>
      </main>
    )
  }
}

/*
1. Curiosity didnt take any photos on the day you specified
2. Curiosity didnt take any photos on the day with camera you specified
*/
//https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2015-6-3&api_key=DEMO_KEY
/*
  console.log(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${NasaAPIKey}`);

for max_sol, max_date, landing_date and total_photos
manifests

https://api.nasa.gov/mars-photos/api/v1/manifests/curiosity?&api_key=DEMO_KEY */