import React from 'react';
import { Chart } from 'primereact/chart';
import moment from 'moment'
import 'primeflex/primeflex.css';
import 'primereact/resources/themes/nova-light/theme.css'
import 'primereact/resources/primereact.min.css'
import './DataTestDashboard.scss'

class Donut_Admin extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            donutLabels : [],
            donutDatasets : [],
            donutHits : [],
        };
    }

    componentDidMount() {
        const myData = this.state.data.slice(0,5);
        var donutLabels = myData.map(function (d) {
            return d.user
          });
          var donutHits = myData.map(function (d) {
            return d.filename
          });
        this.setState({donutLabels, donutHits});

    }

    render() {
        const data = {
            labels: this.state.donutLabels,
            datasets: [
                {
                    data: this.state.donutHits,
                    backgroundColor: [
                        "#B33D26",
                        "#FFB81C",
                        "#2D68C4",
                        "#5B6770",
                        "#D0D3D4",
                    ],
                    hoverBackgroundColor: [
                        "#FF6384",
                        "#FFCE56",
                        "#6292db",
                        "#7C878E",
                        "#f8f8f9"

                    ]
                }]    
            };
        return (
            <div>
                    <div>
                            <div className="content-section implementation">
                                <Chart type="doughnut" data={data} />
                            </div>
                    </div>
            </div>

        );
    }
}
export default Donut_Admin;