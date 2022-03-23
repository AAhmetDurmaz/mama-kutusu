import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const RandevuSorgula = () => {
    const params = useParams();
    const [alertText, setAlertText] = useState('');
    const [alertDisplay, setAlertDisplay] = useState(false);
    const [data, setData] = useState({});
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        axios.get(window.apibase + 'randevu/' + params.id, { headers: { 'Content-Type': 'application/json' } }).then((response, err) => {
            if (err) {
                console.log(err);
                setAlertText('Bir sorun oluştu. Lütfen daha sonra tekrar deneyin.');
                setAlertDisplay(true);
            } else {
                if (response.status !== 200) {
                    setAlertText('Bir sorun oluştu. Lütfen daha sonra tekrar deneyin.');
                    setAlertDisplay(true);
                } else {
                    setData(response.data);
                    console.log(response.data);
                    setLoaded(true);
                }
            }
        })
    }, [])

    return (
        <div className='max-w-7xl mx-auto'>
            <div className={'bg-red-500 border border-red-600 text-white py-2 px-4 rounded text-center ' + (alertDisplay ? 'block' : 'hidden')}>{alertText}</div>
            <div className='max-w-3xl mx-auto grid place-items-center py-5 bg-white my-5 shadow-xl rounded border'>
                {
                    loaded ?
                        <ul className='font-semibold'>
                            <li>İsim Soyisim: {data.name}</li>
                            <li>Hayvan Tipi: {data.animalType === 1 ? 'Kedi' : 'Köpek'}</li>
                            <li>Besin Tipi: {data.foodType === 1 ? 'Kuru mama' : 'Yaş mama'}</li>
                            <li>Randevu Zamanı: {new Date(data.meetingDate).toLocaleString('tr-TR')}</li>
                        </ul>
                        : ''
                }
            </div>
        </div>
    )
}

export default RandevuSorgula