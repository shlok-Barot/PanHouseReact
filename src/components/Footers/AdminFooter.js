/*eslint-disable*/
import React from "react";

// reactstrap components
import { Row, Col, Button } from "reactstrap";

class Footer extends React.Component {
 
  handlSendSocialMedia(data){
    if(data === "facebook"){
      window.open("https://www.facebook.com/shlok.barot.90/", "_blank");
    }else if(data === "twitter"){
      window.open("https://twitter.com/BarotShlok", "_blank");
    }else if(data === "instagram"){
      window.open("https://www.instagram.com/shlok_barot/", "_blank");
    }else if(data === "youtube"){
      window.open("https://www.youtube.com/channel/UC0ghMqAix38S_IEv82NkFVw?reload=9", "_blank");
    }
  }
  render() {
    return (
      <footer className="footer" style={{ padding: "0.8rem" }}>
        <Row className="align-items-center justify-content-xl-between">
          <Col xl="6">
            <div className="copyright text-center text-xl-left text-muted">
              © 2020
              <a
                className="font-weight-bold ml-1"
                href="#!"
                rel="noopener noreferrer"
              >
                Pan House
              </a>
            </div>
          </Col>
          <Col xl="6">
            <div className="copyright text-center text-xl-right text-muted btn-fafa">
              {/* <label className="footername">Shlok Barot<span className="footername">+91 960 100 1019</span></label> */}
              <Button
                type="button"
                className="btn-icon-only rounded-circle btn btn-facebook"
                onClick={this.handlSendSocialMedia.bind(this,"facebook")}
              >
                <span className="btn-inner--icon">
                  <i className="fab fa-facebook"></i>
                </span>
              </Button>
              <Button
                type="button"
                className="btn-icon-only rounded-circle btn btn-twitter"
                onClick={this.handlSendSocialMedia.bind(this,"twitter")}
              >
                <span className="btn-inner--icon">
                  <i className="fab fa-twitter"></i>
                </span>
              </Button>
              <Button
                type="button"
                className="btn-icon-only rounded-circle btn btn-instagram"
                onClick={this.handlSendSocialMedia.bind(this,"instagram")}
              >
                <span className="btn-inner--icon">
                  <i className="fab fa-instagram"></i>
                </span>
              </Button>
              <Button
                type="button"
                className="btn-icon-only rounded-circle btn btn-youtube"
                onClick={this.handlSendSocialMedia.bind(this,"youtube")}
              >
                <span className="btn-inner--icon">
                  <i className="fab fa-youtube"></i>
                </span>
              </Button>
            </div>
          </Col>
        </Row>
      </footer>
    );
  }
}

export default Footer;
