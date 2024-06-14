import { useEffect } from 'react';
import Container from './Container';

function CuacaWidget() {
  useEffect(() => {
    (function(d, s, id) {
      if (d.getElementById(id)) {
        if (window.__TOMORROW__) {
          window.__TOMORROW__.renderWidget();
        }
        return;
      }
      const fjs = d.getElementsByTagName(s)[0];
      const js = d.createElement(s);
      js.id = id;
      js.src = "https://www.tomorrow.io/v1/widget/sdk/sdk.bundle.min.js";

      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'tomorrow-sdk');
  }, []);
  

  

  return (
    <Container>
        <h1 className='mt-10 text-4xl font-sans font-bold'>Cuaca dan Kualitas Udara</h1>
        <div className="tomorrow mt-5" 
        data-location-id="057061"
        data-language="EN"
        data-unit-system="METRIC"
        data-skin="light"
        data-widget-type="upcoming"
        style={{ paddingBottom: '22px', position: 'relative' }}
        >
            <a
                href="https://www.tomorrow.io/weather-api/"
                rel="nofollow noopener noreferrer"
                target="_blank"
                style={{ position: 'absolute', bottom: 0, transform: 'translateX(-50%)', left: '50%' }}
            >
                 <img
                alt=" the Tomorrow.io Weather API"
                src="https://weather-website-client.tomorrow.io/img/powered-by.svg"
                width="250"
                height="18" 
                /> 
            </a>
        </div>
        <div className="tomorrow"
        data-location-id="057061"
        data-language="ID"
        data-unit-system="METRIC"
        data-skin="light"
        data-widget-type="aqiPollutant"
        style={{ paddingBottom: '22px', position: 'relative' }}
        >
            <a
            href="https://www.tomorrow.io/weather-api/"
            rel="nofollow noopener noreferrer"
            target="_blank"
            style={{ position: 'absolute', bottom: 0, transform: 'translateX(-50%)', left: '50%' }}
            >
            <img
                alt="Powered by the Tomorrow.io Weather API"
                src="https://weather-website-client.tomorrow.io/img/powered-by.svg"
                width="250"
                height="18"
            />
            </a>
      </div>
    </Container>
  );
}

export default CuacaWidget;
