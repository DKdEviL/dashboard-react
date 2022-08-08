import React, { useContext, useEffect, useState } from "react";
import { Alert, Col, Container, Row, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { logOut } from "../config/firebase";
import {
  IDashbaordData,
  UserInterfaceProps,
} from "../interfaces/pages.interface";
import { UserContext } from "../providers/UserProvider";
import NavBar from "./components/NavBar";
import sessionLogo from "../assets/sessions.svg";

const Dashboard = () => {
  const user: any = useContext(UserContext);
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserInterfaceProps>({
    displayName: "",
    photoURL: "",
  });
  const [dashboardData, setDashboardData] = useState<IDashbaordData | null>(
    null
  );
  const [isDataFetching, setIsDataFetching] = useState<boolean>(false);

  useEffect(() => {
    setIsDataFetching(true);
    fetch("https://mocki.io/v1/bb11aecd-ba61-44b9-9e2c-beabc442d818")
      .then((res) => res.json())
      .then((data) => {
        setDashboardData({ ...data });
        setIsDataFetching(false);
      });
  }, []);

  useEffect(() => {
    if (!user.user) {
      navigate("/home");
    } else {
      setUserData({
        displayName: user.user.displayName,
        photoURL: user.user.photoURL,
      });
    }
  }, [user]);
  return (
    <div>
      <NavBar displayName={userData.displayName} photoURL={userData.photoURL} />
      {isDataFetching ? (
        <Spinner animation="grow" />
      ) : (
        <Container>
          <Row>
            <Col md={6}>
              <Row xs={1} sm={1} md={2} className="border border-1 p-2 m-2">
                <Col md={12} className="my-3">
                  <span className="fs-4">Overview</span>
                </Col>
                <Col>
                  <Alert
                    variant="info"
                    className="d-flex align-items-center justify-content-between border-0 my-2"
                  >
                    <span
                      style={{ color: "#181818" }}
                      className="fw-semibold m-3"
                    >
                      Profile Views
                    </span>
                    <span
                      className="fs-5 fw-semibold mx-5 my-3"
                      style={{ color: "#4F65F6" }}
                    >
                      {dashboardData?.dashboard_stats.profile_views}
                    </span>
                  </Alert>
                </Col>
                <Col>
                  <Alert
                    variant="info"
                    className="d-flex align-items-center justify-content-between border-0 my-2"
                  >
                    <span
                      style={{ color: "#181818" }}
                      className="fw-semibold m-3"
                    >
                      Mentorship Sessions
                    </span>
                    <span
                      className="fs-5 fw-semibold mx-5 my-3"
                      style={{ color: "#4F65F6" }}
                    >
                      {dashboardData?.dashboard_stats.mentorship_sessions}
                    </span>
                  </Alert>
                </Col>
                <Col>
                  <Alert
                    variant="info"
                    className="d-flex align-items-center justify-content-between border-0 my-2"
                  >
                    <span
                      style={{ color: "#181818" }}
                      className="fw-semibold m-3"
                    >
                      Jobs Applied
                    </span>
                    <span
                      className="fs-5 fw-semibold mx-5 my-3"
                      style={{ color: "#4F65F6" }}
                    >
                      {dashboardData?.dashboard_stats.jobs_applied}
                    </span>
                  </Alert>
                </Col>
                <Col>
                  <Alert
                    variant="info"
                    className="d-flex align-items-center justify-content-between border-0 my-2"
                  >
                    <span
                      style={{ color: "#181818" }}
                      className="fw-semibold m-3"
                    >
                      Skills Verified
                    </span>
                    <span
                      className="fs-5 fw-semibold mx-5 my-3"
                      style={{ color: "#4F65F6" }}
                    >
                      {dashboardData?.dashboard_stats.skills_verified}
                    </span>
                  </Alert>
                </Col>
              </Row>
              <Row className="border border-1 p-2 m-2">
                <Col md={12} className="my-3">
                  <span className="fs-4 fw-semibold">Upcoming Sessions</span>
                </Col>
                {dashboardData?.upcoming_sessions.map((session) => {
                  return (
                    <Row key={session.mentor_name + "-session"}>
                      <Alert
                        variant="light"
                        className="d-flex align-items-center border-0 my-2 position-relative after-arrow"
                      >
                        <img src={sessionLogo} alt="logo" />
                        <div
                          className="flex-column mx-3"
                          style={{ minWidth: "45%" }}
                        >
                          <p className="fw-semibold d-flex justify-content-between">
                            <span>{session.mentor_name}</span>
                            <span>{session.timings}</span>
                          </p>
                          <p className="d-flex justify-content-between">
                            <span>{session.date}</span>
                          </p>
                        </div>
                        <Alert
                          className="d-flex align-items-center m-0"
                          style={{ height: "40px" }}
                          variant={
                            session.session_type === "Mentorship"
                              ? "danger"
                              : "secondary"
                          }
                        >
                          {session.session_type}
                        </Alert>
                      </Alert>
                    </Row>
                  );
                })}
              </Row>
            </Col>
            <Col md={6}>
              <Row className="border border-2 p-2 m-2">
                <Col md={12} className="my-3">
                  <span className="fs-4">New Jobs</span>
                </Col>
                <Col md={12}>
                  <Alert
                    variant="info"
                    className="d-flex align-items-center justify-content-between border-0 my-2"
                  >
                    <span
                      style={{ color: "#181818" }}
                      className="fw-semibold m-3"
                    >
                      Profile Views
                    </span>
                    <span
                      className="fs-5 fw-semibold mx-5 my-3"
                      style={{ color: "#4F65F6" }}
                    >
                      {dashboardData?.dashboard_stats.profile_views}
                    </span>
                  </Alert>
                </Col>
                <Col md={12}>
                  <Alert
                    variant="info"
                    className="d-flex align-items-center justify-content-between border-0 my-2"
                  >
                    <span
                      style={{ color: "#181818" }}
                      className="fw-semibold m-3"
                    >
                      Mentorship Sessions
                    </span>
                    <span
                      className="fs-5 fw-semibold mx-5 my-3"
                      style={{ color: "#4F65F6" }}
                    >
                      {dashboardData?.dashboard_stats.mentorship_sessions}
                    </span>
                  </Alert>
                </Col>
                <Col md={12}>
                  <Alert
                    variant="info"
                    className="d-flex align-items-center justify-content-between border-0 my-2"
                  >
                    <span
                      style={{ color: "#181818" }}
                      className="fw-semibold m-3"
                    >
                      Jobs Applied
                    </span>
                    <span
                      className="fs-5 fw-semibold mx-5 my-3"
                      style={{ color: "#4F65F6" }}
                    >
                      {dashboardData?.dashboard_stats.jobs_applied}
                    </span>
                  </Alert>
                </Col>
                <Col md={12}>
                  <Alert
                    variant="info"
                    className="d-flex align-items-center justify-content-between border-0 my-2"
                  >
                    <span
                      style={{ color: "#181818" }}
                      className="fw-semibold m-3"
                    >
                      Skills Verified
                    </span>
                    <span
                      className="fs-5 fw-semibold mx-5 my-3"
                      style={{ color: "#4F65F6" }}
                    >
                      {dashboardData?.dashboard_stats.skills_verified}
                    </span>
                  </Alert>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
};

export default Dashboard;
