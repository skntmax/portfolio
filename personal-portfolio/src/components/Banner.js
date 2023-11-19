import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import headerImg from "../assets/img/header-img.svg";
import { ArrowRightCircle } from 'react-bootstrap-icons';
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Banner = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  const toRotate = [  ", a Full Stack Developer", ",a devops" ];
  const period = 2000;

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => { clearInterval(ticker) };
  }, [text])

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(prevDelta => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex(prevIndex => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(500);
    } else {
      setIndex(prevIndex => prevIndex + 1);
    }
  }

  return (
    <section className="banner" id="home">
      <Container>
        <Row className="aligh-items-center">
          <Col xs={12} md={6} xl={7}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                <span className="tagline">Welcome to my Portfolio 
                 <a href="./assets//shashi-11june2023.pdf" title=" download resume" ><i className="bi bi-download"></i> </a>  </span>
                <h1>{`Hi! I'm shashi kant`} <span className="txt-rotate" dataPeriod="1000" data-rotate='[ " \, a  Full Stack Developer", "a devops"  ]'><span className="wrap">{text}</span></span></h1>
                  <p> Hello, my name is Shashi Kant, and I specialize in full-stack development using the MEAN and MERN technology stacks. Currently, I am employed at Value Innovation Labs, where I hold the position of a full-stack developer. In this role, I am responsible for designing and implementing the complete architecture of various projects or modules, encompassing frontend development, backend functionality, database structure, and deploying them to cloud servers.

                   </p>

                   <p>
                   During my tenure at Value Innovation Labs, I have successfully delivered numerous modules for the EPIL project and CCIL, and I have also contributed to the integration of Zoom into rozgar.com. Additionally, I have resolved multiple bugs across various projects, including FICSI (Sector Skill Council for Food Processing Industries), CCIL (Cement Corporation of India), EPIL (Engineering Enterprise Level Project), and ROZGAR (Naukri Portal).
                   </p>

                   <p>Throughout my professional journey, I have honed my skills in React.js, Next.js, Node.js, SQL and NoSQL databases, Linux (Ubuntu), and cloud server management (AWS). I strive to consistently deliver exceptional results within specified timelines, continually pushing myself to achieve the highest standards of excellence.
                   </p>


                  <button onClick={() => window.location.href = "https://cv.skntmax.co.in/" } title="https://cv.skntmax.co.in/">Let’s Connect <ArrowRightCircle size={25} /></button>
              </div>}
            </TrackVisibility>
          </Col>
          <Col xs={12} md={6} xl={5}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__zoomIn" : ""}>
                  <img src={headerImg} alt="Header Img"/>
                </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
