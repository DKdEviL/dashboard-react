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
import jobsLogo from '../assets/jobs.svg'

const Dashboard = () => {
  const user: any = useContext(UserContext);
  const navigate = useNavigate();
  const oneDay = 24*60*60*1000;
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

  const timeSince = (date: any) => {

    var seconds = Math.floor((new Date().getTime() - date) / 1000);
  
    var interval = seconds / 31536000;
  
    if (interval > 1) {
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }

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
            <Col md={6} className="p-3 p-md-0">
              <Row xs={1} sm={1} md={2} className="border border-1 p-2 m-2 fw-semibold rounded">
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
                      className="fw-semibold my-2"
                    >
                      Profile Views
                    </span>
                    <span
                      className="fs-5 fw-semibold mx-3 my-3"
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
                      className="fw-semibold my-2"
                    >
                      Mentorship Sessions
                    </span>
                    <span
                      className="fs-5 fw-semibold mx-3 my-3"
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
                      className="fw-semibold my-2"
                    >
                      Jobs Applied
                    </span>
                    <span
                      className="fs-5 fw-semibold mx-3 my-3"
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
                      className="fw-semibold my-3"
                    >
                      Skills Verified
                    </span>
                    <span
                      className="fs-5 fw-semibold mx-3 my-3"
                      style={{ color: "#4F65F6" }}
                    >
                      {dashboardData?.dashboard_stats.skills_verified}
                    </span>
                  </Alert>
                </Col>
              </Row>
              <Row className="border border-1 p-2 m-2 rounded">
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
              <Row className="border border-1 p-2 m-2 rounded">
                <Col md={12} className="my-3">
                  <span className="fs-4 fw-semibold">New Jobs</span>
                </Col>
                {dashboardData?.job_postings.map((job) => {
                  return (
                    <Row key={job.date_posted + job.organization_name + "-jobs"}>
                      <Alert
                        variant="light"
                        className="d-flex align-items-center border-0 my-2 position-relative after-arrow"
                      >
                        <img src={jobsLogo} height={50} width={50} alt="logo" />
                        <div
                          className="flex-column mx-3"
                          style={{ minWidth: "35%" }}
                        >
                          <p className="d-flex flex-column justify-content-between">
                            <span className="fw-semibold">{job.role}</span>
                            <span>{job.organization_name}</span>
                            <span>{job.location}</span>
                          </p>
                        </div>
                        <p className="d-flex justify-content-center align-items-center">
                            {timeSince(new Date(job.date_posted).getTime() - oneDay) + ` Ago`}
                        </p>
                      </Alert>
                    </Row>
                  );
                })}
              </Row>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
};

export default Dashboard;
