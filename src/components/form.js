import React, { Component } from 'react'

const APIKEY = process.env.REACT_APP_API_KEY;

export default class Form extends Component {
  state = {
    camera: 'all',
    sol: '0',
    manifest: null,
    maxSol: '',
    loading: 'true',
    data: null,
    page: 1,
    errors: { camera: "", sol: "" }
  }

  async componentDidMount() {
    await this.getManifest();
    console.log('data loaded')
  }


  getManifest = () => {
    if (this.state.manifest === null) {
      fetch(`https://api.nasa.gov/mars-photos/api/v1/manifests/curiosity?&api_key=${APIKEY}`)
        .then(res => res.json())
        .then(resJson => this.setState({ manifest: resJson.photo_manifest, maxSol: resJson.photo_manifest.max_sol }))
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

  handleCamera = (e) => {
    this.setState({ camera: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { sol, camera } = this.state;

    let url = '';

    if (camera === 'all') {
      url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${sol}&page=1&api_key=${APIKEY}`;
    } else {
      url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${sol}&page=1&camera=${camera}&api_key=${APIKEY}`;
    }

    fetch(url)
      .then(res => res.json())
      .then(resJson => {
        this.setState({ data: resJson })
      }
      )

    console.log("sol " + this.state.sol, "cam " + this.state.camera)
  }

  render() {
    const { sol, camera, maxSol, data } = this.state;

    return (
      <main>
        Mars Curiosity Rover Photo Viewer
        <div className="form">
          <p>{`Sol (0 to ${maxSol})`}</p>
          <input type="number" onChange={this.handleSol} value={sol} name="sol" id="sol" min="0" max={maxSol} />
          <select name="camera" id="camera" value={camera} onChange={this.handleCamera}>
            <option value="all">All</option>
            <option value="FHAZ">Front Hazard Avoidance Camera</option>
            <option value="RHAZ">Rear Hazard Avoidance Camera</option>
            <option value="MAST">Mast Camera</option>
            <option value="CHEMCAM">Chemistry and Camera Complex</option>
            <option value="MAHLI">Mars Hand Lens Imager</option>
            <option value="MARDI">Mars Descent Imager</option>
            <option value="NAVCAM">Navigation Camera</option>
          </select>
          <button type="submit" onClick={this.handleSubmit}>Submit</button>
        </div>
        <div>
          {data ? data.photos.map(photo => {
            return (<img key={photo.id} src={photo.img_src} alt="" />)
          }) : "no data found"}
        </div>
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