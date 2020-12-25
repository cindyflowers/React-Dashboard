import React, { useState } from 'react';
import moment from 'moment'
import { dashboardService } from '../../_services';
import MapTestDataModal from './MapTestDataModal';
import MapTestWidget from './MapTestWidget';
import './MapTestDashboard.css'
//import { GoogleMap, LoadScript } from '@react-google-maps/api'
import GoogleMapReact from 'google-map-react';
// import Map from "./../GoogleReact/Map";
// import Marker from "./../GoogleReact/Marker";
// import MarkerClusterer from "./../GoogleReact/MarkerClusterer";
// import Popup from "./../GoogleReact/Popup";
// import TransitLayer from "./../GoogleReact/TransitLayer";
import getPlaces from "./../Utilities/getPlaces";
const base = { lat: 35.6432027, lng: 139.6729435 };

//const AnyReactComponent = ({ text }) => <div>{text}</div>;
// const places = getPlaces();
// const [placeIndex, setPlaceIndex] = useState(0);
// const [bound, setBound] = useState({});
// const [transitLayerEnabled, setTransitLayerEnabled] = useState(false);
// const [clickCnt, setClickCnt] = useState(0);

// class MapTestDashboard extends React.Component {
   
//     constructor(props) {
//         super(props);
//         this.state = {
//             dashboardBAT_Data: null,
//             dashboardBAT_Error: null,
//             startUTCTimeWithZ: "2019-10-09T20:00:00.000Z",
//             endUTCTimeWithZ: "2019-09-08T20:00:00.000Z",  // past 30 days of data
//             myCurentEndDateTime: null,
//             myCurentStartDateTime: null,
//             myBATDataSubscription: null,
//             googleAPIKey: 'AIzaSyD-UCheqLbDr1b66fjSAB7prDGNk6ulfQA',
//             // places: getPlaces(),
//             // placeIndex: setPlaceIndex(),
//             // [placeIndex, setPlaceIndex]: useState(0),
//             // [bound, setBound]: useState({}),
//             // [transitLayerEnabled, setTransitLayerEnabled]: useState(false)
//         };       
//     }

    export default function MapTestDashboard() {
        const places = getPlaces();
        const [placeIndex, setPlaceIndex] = useState(0);
        const [bound, setBound] = useState({});
        const [transitLayerEnabled, setTransitLayerEnabled] = useState(false);
        const [clickCnt, setClickCnt] = useState(0);
        const dashboardBAT_Data = null;
        const dashboardBAT_Error = null;
        const startUTCTimeWithZ = "2019-10-09T20:00:00.000Z";
        const endUTCTimeWithZ = "2019-09-08T20:00:00.000Z";  // past 30 days of data
        const myCurentEndDateTime = null;
        const myCurentStartDateTime = null;
        const myBATDataSubscription = null;
        const googleAPIKey = 'AIzaSyD-UCheqLbDr1b66fjSAB7prDGNk6ulfQA';

        // componentDidMount() {
        //     dashboardService.initializeDashboard(this.state.startUTCTimeWithZ, this.state.endUTCTimeWithZ)
        //         .then (dashboardBAT_Data => {
        //                 this.setState({ dashboardBAT_Data });
        //         })
        //         .catch(error => {
        //             this.setState({dashboardBAT_Error: error});
        //         });
        //     this.state.myCurentEndDateTime = moment(this.state.endUTCTimeWithZ).format("dddd, MMMM Do YYYY, h:mm:ss a");
        //     this.state.myCurentStartDateTime = moment(this.state.startUTCTimeWithZ).format("dddd, MMMM Do YYYY, h:mm:ss a");
        // }

        // componentWillUnmount() {
            
        // }

        //     render() {
        // const { dashboardBAT_Data, dashboardBAT_Error, endUTCTimeWithZ, myCurentEndDateTime, startUTCTimeWithZ, myCurentStartDateTime } = this.state;
      
        return (
          <div style={{width: 1000, minHeight: 1000}}>
            <h2>Explore page - with Marker Clusterer and Custom React Element</h2>
            <h5>Zoom in/zoom out to see the markers cluster effect</h5>
            <h5>Custom React Element can be used as map overlay</h5>
                <GoogleMapReact
                  bootstrapURLKeys={{ key: 'AIzaSyD-UCheqLbDr1b66fjSAB7prDGNk6ulfQA' }}
                  //defaultCenter={0.0}
                  //defaultCenter={{ lat: 56.9425, lng: 24.1319 }}
                  center={{ lat: 56.9425, lng: 24.1319 }}
                  //</div>defaultCenter={props.defaultCenter ? props.defaultCenter : { lat: 56.9425, lng: 24.1319 }}
                  //defaultZoom={10}
                  zoom={10}
                  minHeight={1000}
                  >
                  {/* <AnyReactComponent
                      lat={59.955413}
                      lng={30.337844}
                      text="My Marker"
                  /> */}
                  </GoogleMapReact>
            {/* <Map
              zoom={10}
              center={{ lat: places[placeIndex].lat, lng: places[placeIndex].lng }}
              events={{ onBoundsChangerd: arg => setBound(arg) }}
            >
              <TransitLayer enabled={transitLayerEnabled} />
              <Popup position={{ lat: base.lat - 0.01, lng: base.lng - 0.1 }}>
                <div onClick={() => setClickCnt(clickCnt + 1)}>
                  Custom React Element {clickCnt}
                </div>
              </Popup>
              <MarkerClusterer>
                {places.map((m, index) => (
                  <Marker
                    key={m.id}
                    active={placeIndex === index}
                    title={"marker id: " + m.id}
                    position={{ lat: m.lat, lng: m.lng }}
                    events={{
                      onClick: () => window.alert(`marker ${index} clicked`)
                    }}
                  />
                ))}
              </MarkerClusterer>
            </Map> */}
            <button
              className="btn"
              onClick={() => setPlaceIndex((placeIndex + 1) % places.length)}
            >
              Next place
            </button>
            <br />
            <button
              className="btn"
              onClick={() => setTransitLayerEnabled(!transitLayerEnabled)}
            >
              Toggle transit layer
            </button>
            <br />
            Current place id: {places[placeIndex].id}
            <br />
            Map bounds: {bound.toString()}
          </div>
        );
      }

//     const places = getPlaces();
//     const [placeIndex, setPlaceIndex] = useState(0);
//     const [bound, setBound] = useState({});
//     const [transitLayerEnabled, setTransitLayerEnabled] = useState(false);
//     const [clickCnt, setClickCnt] = useState(0);

//     static defaultProps = {
//         center: {
//           lat: 59.95,
//           lng: 30.33
//         },
//         zoom: 11
//       };

//     componentDidMount() {
//         dashboardService.initializeDashboard(this.state.startUTCTimeWithZ, this.state.endUTCTimeWithZ)
//             .then (dashboardBAT_Data => {
//                     this.setState({ dashboardBAT_Data });
//             })
//             .catch(error => {
//                 this.setState({dashboardBAT_Error: error});
//             });
//         this.state.myCurentEndDateTime = moment(this.state.endUTCTimeWithZ).format("dddd, MMMM Do YYYY, h:mm:ss a");
//         this.state.myCurentStartDateTime = moment(this.state.startUTCTimeWithZ).format("dddd, MMMM Do YYYY, h:mm:ss a");
//     }

//     componentWillUnmount() {
        
//     }

//     render() {
//         const { dashboardBAT_Data, dashboardBAT_Error, endUTCTimeWithZ, myCurentEndDateTime, startUTCTimeWithZ, myCurentStartDateTime } = this.state;
        
//         return (
            
//             <div class="m-3">
//                 <div class row>
//                     <h4>Welcome to the Map Test Playground!</h4>
//                     {dashboardBAT_Data === null &&
//                         <div class="d-flex justify-content-center">
//                             <div class="spinner-border" role="status">                                    
//                                 <span class="sr-only">Loading...</span>
//                             </div>
//                         </div>                                
//                     }
//                     <p>
//                         {dashboardBAT_Error &&
//                             <div class="alert alert-danger" role="alert">
//                                 <strong>Oh snap!</strong> {dashboardBAT_Error}
//                             </div>
//                         }
//                     </p> 
//                     {dashboardBAT_Data  &&
//                         <div>
//                             <p>
//                                 Start Date in UTC: <b>{startUTCTimeWithZ}</b> <br></br>
//                                 Start Date your time: <b>{myCurentStartDateTime}</b><br></br>
//                                 End Date in UTC: <b>{endUTCTimeWithZ}</b> <br></br>
//                                 End Date your time: <b>{myCurentEndDateTime}</b> 
//                             </p>

//                             <div>
//                                 <MapTestDataModal body="Success!" buttonText="Show dashboardBAT_Data..." title="dashboardService.initializeDashboard - Test Success" 
//                                     dashboardBAT_Data={dashboardBAT_Data.Failures}/>
//                             </div>

 
//                             <div class="row">
//                                 <div class="col-md border border-secondary rounded m-1">
// {/*                                      <p class="text-center"><strong>Put a Map here!</strong></p>
//                                     <GoogleMapReact
//                                         bootstrapURLKeys={{ key: 'AIzaSyD-UCheqLbDr1b66fjSAB7prDGNk6ulfQA' }}
//                                         defaultCenter={this.props.center}
//                                         defaultZoom={this.props.zoom}
//                                         >
//                                         <AnyReactComponent
//                                             lat={59.955413}
//                                             lng={30.337844}
//                                             text="My Marker"
//                                         />
//                                         </GoogleMapReact>
//                                     <MapTestWidget />  */}
//                                                   <h2>Explore page - with Marker Clusterer and Custom React Element</h2>
//               <h5>Zoom in/zoom out to see the markers cluster effect</h5>
//               <h5>Custom React Element can be used as map overlay</h5>
//               <Map
//                 zoom={10}
//                 center={{ lat: places[placeIndex].lat, lng: places[placeIndex].lng }}
//                 events={{ onBoundsChangerd: arg => setBound(arg) }}
//               >
//                 <TransitLayer enabled={transitLayerEnabled} />
//                 <Popup position={{ lat: base.lat - 0.01, lng: base.lng - 0.1 }}>
//                   <div onClick={() => setClickCnt(clickCnt + 1)}>
//                     Custom React Element {clickCnt}
//                   </div>
//                 </Popup>
//                 <MarkerClusterer>
//                   {places.map((m, index) => (
//                     <Marker
//                       key={m.id}
//                       active={placeIndex === index}
//                       title={"marker id: " + m.id}
//                       position={{ lat: m.lat, lng: m.lng }}
//                       events={{
//                         onClick: () => window.alert(`marker ${index} clicked`)
//                       }}
//                     />
//                   ))}
//                 </MarkerClusterer>
//               </Map>
//               <button
//                 className="btn"
//                 onClick={() => setPlaceIndex((placeIndex + 1) % places.length)}
//               >
//                 Next place
//               </button>
//               <br />
//               <button
//                 className="btn"
//                 onClick={() => setTransitLayerEnabled(!transitLayerEnabled)}
//               >
//                 Toggle transit layer
//               </button>
//               <br />
//               Current place id: {places[placeIndex].id}
//               <br />
//               Map bounds: {bound.toString()}
//                                 </div>
//                             </div>
//                         </div>                 
//                     }
//                 </div>

//             </div>
//         );

/*         return (
            <div>
              <h2>Explore page - with Marker Clusterer and Custom React Element</h2>
              <h5>Zoom in/zoom out to see the markers cluster effect</h5>
              <h5>Custom React Element can be used as map overlay</h5>
              <Map
                zoom={10}
                center={{ lat: places[placeIndex].lat, lng: places[placeIndex].lng }}
                events={{ onBoundsChangerd: arg => setBound(arg) }}
              >
                <TransitLayer enabled={transitLayerEnabled} />
                <Popup position={{ lat: base.lat - 0.01, lng: base.lng - 0.1 }}>
                  <div onClick={() => setClickCnt(clickCnt + 1)}>
                    Custom React Element {clickCnt}
                  </div>
                </Popup>
                <MarkerClusterer>
                  {places.map((m, index) => (
                    <Marker
                      key={m.id}
                      active={placeIndex === index}
                      title={"marker id: " + m.id}
                      position={{ lat: m.lat, lng: m.lng }}
                      events={{
                        onClick: () => window.alert(`marker ${index} clicked`)
                      }}
                    />
                  ))}
                </MarkerClusterer>
              </Map>
              <button
                className="btn"
                onClick={() => setPlaceIndex((placeIndex + 1) % places.length)}
              >
                Next place
              </button>
              <br />
              <button
                className="btn"
                onClick={() => setTransitLayerEnabled(!transitLayerEnabled)}
              >
                Toggle transit layer
              </button>
              <br />
              Current place id: {places[placeIndex].id}
              <br />
              Map bounds: {bound.toString()}
            </div>
          ); */
//     }
//}
export { MapTestDashboard }; 