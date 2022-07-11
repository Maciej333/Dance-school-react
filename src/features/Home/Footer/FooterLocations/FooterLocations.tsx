import React from 'react';
import { getAllLocations } from '../../../../app/api/location.api';
import { withApi } from '../../../../app/hoc/withApi';
import { Location } from '../../../../app/model/location.model';
import './FooterLocations.style.scss';

const FooterLocationsComponent = (props: { apiData?: Location[] }) => {

    const { apiData } = props;

    return (
        apiData && apiData?.length > 0 ?
            <div className='footer-section footer-locations'>
                <h3>locations</h3>
                {
                    apiData.map((el, id) => {
                        return <p key={`[location] = ${id}`}>{el.adress}</p>
                    })
                }
                {/* old version of google maps, withou api key*/}
                {/* <iframe
                    title='location-maps'
                    className='location-maps'
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps?q=${apiData.reduce((prevEL, currentEL) => {
                        return prevEL + currentEL.adress.replace(" ", "+") + "&";
                    }, '')}output=embed`}
                >\
                </iframe> */}
            </div>
            :
            null
    )
}

const FooterLocations = withApi(FooterLocationsComponent, "cannot load locations", getAllLocations);
export default FooterLocations;