import React, { useState, useEffect } from 'react';
import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet';
import { v4 as uuid } from 'uuid';
import L from 'leaflet';
import axios from 'axios';
import QRCode from 'qrcode.react';

const dates = [1647982800000, 1647983700000, 1647984600000, 1647985500000, 1647986400000,
    1647987300000, 1647988200000, 1647989100000, 1647990000000, 1647990900000, 1647991800000,
    1647992700000, 1647993600000, 1647994500000, 1647995400000, 1647996300000, 1647997200000,
    1647998100000, 1647999000000, 1647999900000, 1648000800000, 1648001700000, 1648002600000,
    1648003500000, 1648004400000, 1648005300000, 1648006200000, 1648007100000, 1648008000000,
    1648008900000, 1648009800000, 1648010700000, 1648011600000, 1648012500000, 1648013400000,
    1648014300000, 1648015200000, 1648016100000, 1648017000000, 1648017900000, 1648018800000,
    1648019700000, 1648020600000, 1648021500000, 1648022400000, 1648023300000, 1648024200000,
    1648025100000, 1648026000000, 1648026900000, 1648027800000, 1648028700000, 1648029600000,
    1648030500000, 1648031400000, 1648032300000, 1648033200000, 1648034100000, 1648035000000,
    1648035900000, 1648036800000, 1648037700000, 1648038600000, 1648039500000, 1648040400000,
    1648041300000, 1648042200000, 1648043100000, 1648044000000, 1648044900000, 1648045800000,
    1648046700000, 1648047600000, 1648048500000, 1648049400000, 1648050300000, 1648051200000,
    1648052100000, 1648053000000, 1648053900000, 1648054800000, 1648055700000, 1648056600000,
    1648057500000, 1648058400000, 1648059300000, 1648060200000, 1648061100000, 1648062000000,
    1648062900000, 1648063800000, 1648064700000, 1648065600000, 1648066500000, 1648067400000,
    1648068300000];

const MainPage = () => {

    const blueMarker = L.icon({
        iconUrl: require('../Images/blue-marker.png'),
        iconSize: [25, 40]
    });
    const [mainText, setMainText] = useState('Randevu almak için mama kutusu seçin.');
    const [position, setPosition] = useState([]);
    const [activeData, setActiveData] = useState({});
    const [fv, setFV] = useState(false); // form visiblity
    const [alertText, setAlertText] = useState('');
    const [alertDisplay, setAlertDisplay] = useState(false);
    const [activeDate, setActiveDate] = useState(new Date());
    const [qrValue, setQRValue] = useState('');
    const [qrDisplay, setQRDisplay] = useState(false);
    useEffect(() => {
        axios.get(window.apibase + 'boxes').then((response, err) => {
            if (err) {
                console.log(err);
                setAlertText('Veritabanı bağlantısında bir sorun oluştu. Lütfen daha sonra tekrar deneyin.');
                setAlertDisplay(true);
            } else {
                setAlertDisplay(false);
                setPosition(response.data);
            }
        })
    }, [setPosition])
    const randevuSubmit = async (e) => {
        e.preventDefault();
        if (e.target[0].value === '' || e.target[1].value === '' || e.target[2].value === '0' || e.target[3].value === '0') {
            setAlertText('Formda boş yerler var.');
            setAlertDisplay(true);
        } else {
            await axios.post(window.apibase + 'update-box', {
                id: activeData._id,
                date: new Date(activeDate).getTime(),
                meetingDate: activeDate,
                name: e.target[0].value,
                phone: e.target[1].value,
                animalType: e.target[2].value,
                foodType: e.target[3].value,
            }, { headers: { 'Content-Type': 'application/json' } }).then((response, err) => {
                if (err) {
                    console.log(err);
                    setAlertText('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
                    setAlertDisplay(true);
                } else {
                    if (response.data.code === 200) {
                        setFV(false);
                        setQRValue('http://localhost:3000/randevu/' + response.data.id);
                        setQRDisplay(true);
                    }
                }
            })
        }
    }
    return (
        <div className='max-w-7xl mx-auto py-4'>
            <MapContainer doubleClickZoom={false} className='map' center={[38.323202, 26.635985]} zoom={16}>
                <TileLayer
                    attribution='&copy; Brains Beyond Time'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {
                    position.map((item) => (
                        <Marker
                            key={uuid()}
                            icon={blueMarker}
                            position={item.position}
                        >
                            <Popup>
                                <p>'{item.positionText}' mama kutusu</p>
                                <button onClick={() => { setFV(false); setActiveData(item); setMainText('\'' + item.positionText + '\' isimli mama kutusundan randevu alıyorsunuz.') }} className='bg-blue-600 hover:bg-blue-800 rounded text-white py-2 px-6 transition'>Seç</button>
                            </Popup>
                        </Marker>
                    ))
                }
            </MapContainer>
            <div className='mx-1'>
                <p className='border-b border-gray-300 font-semibold mt-1 mb-1 text-2xl'>{mainText}</p>
                <div className='grid md:grid-cols-12 grid-cols-4'>
                    {
                        activeData.positionText === undefined ? '' :
                            dates.map(item => (
                                activeData.freeDates.includes(new Date(item).toISOString()) ? <button key={uuid()} onClick={() => { setFV(true); setActiveDate(new Date(item)); }} className='transition mr-1 mb-1 py-1 px-6 bg-blue-600 hover:bg-blue-800 rounded text-white'>{new Date(item).getHours()}:{new Date(item).getMinutes()}</button>
                                    :
                                    <button disabled key={uuid()} className='mr-1 py-1 px-6 bg-gray-300 rounded mb-1 text-white'>{new Date(window.UnixToTimestamp(item)).getHours()}:{new Date(window.UnixToTimestamp(item)).getMinutes()}</button>
                            ))
                    }
                </div>
                {
                    fv ?
                        <>
                            <div className={'bg-red-500 border border-red-600 text-white py-2 px-4 rounded text-center ' + (alertDisplay ? 'block' : 'hidden')}>{alertText}</div>
                            <form onSubmit={randevuSubmit}>
                                <div className='grid place-items-center'>
                                    <p className='font-semibold'>{new Date(activeDate).toLocaleString('tr-TR')} Tarihine randevu alıyorsunuz.</p>
                                    <p>Randevu alabilmeniz için birkaç verinize ihtiyacımız var.</p>
                                    <input name='name' placeholder='İsim Soyisim' type='text' className='md:w-1/3 w-full border py-2 px-4 rounded mb-1' />
                                    <input name='phone' placeholder='10 Haneli Telefon Numarası' type='text' maxLength={10} className='md:w-1/3 w-full border py-2 px-4 rounded mb-1' />
                                    <select className='border py-2 px-4 rounded mb-1 md:w-1/3 w-full'>
                                        <option defaultChecked value={0}>Bağışlamak mamanın hangi hayvan için olduğunu seçin.</option>
                                        <option value={1}>Kedi</option>
                                        <option value={2}>Köpek</option>
                                    </select>
                                    <select className='border py-2 px-4 rounded mb-1 md:w-1/3 w-full'>
                                        <option defaultChecked value={0}>Bağışalamak istediğiniz mama türünü girin.</option>
                                        <option value={1}>Kuru mama</option>
                                        <option value={2}>Yaş mama</option>
                                    </select>
                                    <p>Randevu aldığınız mama kutusu: {activeData.positionText}</p>
                                    <button type='submit' className='text-white bg-blue-600 hover:bg-blue-800 transition rounded py-2 px-4'>Randevu al</button>
                                </div>
                            </form>
                            <p className='font-semibold'>Not: Girdiğiniz veriler KVKK dahilinde 'Brains Beyond Time' ekibi tarafından işlenecektir.</p>
                        </>
                        :
                        ''
                }
                <div className={'grid place-items-center ' + (qrDisplay ? 'block' : 'hidden')}>
                    <p>Bu QR kodu mama kutusuna okutmanız gerekecek. Lütfen kaybetmeyin.</p>
                    <QRCode className='h-128 w-128' value={qrValue} />
                </div>
            </div>
        </div>
    )
}

export default MainPage