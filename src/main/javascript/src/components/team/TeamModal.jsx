import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import { InputLabeled } from "../common/InputLabeled";
import {
  backendUrl,
  fetchSaveTeam,
  fetchTeamChecked,
} from "../utils/fetchUtils";
import { MyDatePicker } from "../common/DateInput";
import { CarPanelModal } from "./CarPanelModal";
import Spinner from "react-bootstrap/Spinner";
import { Selector } from "../common/Selector";
import authHeader from "../../service/auth-header";
import {
  faUserAstronaut,
  faUserClock,
  faUserFriends,
  faBuilding,
  faAt,
  faPhoneAlt,
  faCarCrash,
} from "@fortawesome/free-solid-svg-icons";
import { getCarLogo } from "../utils/car";

export const TeamModal = ({ show, handleClose, handleOk, myEvent, mode }) => {
  const [disable, setDisable] = useState(false);
  const [team, setTeam] = useState(undefined);
  const [carsOption, setCarsOption] = useState([]);
  const [addCar, setAddCar] = useState();
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!show) return;

    setMsg("");
    if (mode === undefined) fetchGetTeam();
    if (mode === "preview") {
      fetchTeam(myEvent?.teamId);
      setDisable(true);
    }

    setCarsOption([]);
  }, [show]);

  const fetchGetTeam = () => {
    axios
      .get(`${backendUrl()}/team/getTeam`, {
        headers: authHeader(),
      })
      .then((res) => {
        if (res.data !== "") setTeam(res.data);
      });
  };

  const fetchTeam = (teamId) => {
    axios
      .get(`${backendUrl()}/team/getTeamByTeamId?teamId=${teamId}`, {
        headers: authHeader(),
      })
      .then((res) => {
        if (res.data !== "") setTeam(res.data);
      });
  };

  useEffect(() => {
    let tempOptions = [];
    if (team !== undefined && team.cars) {
      team.cars.map((x) => {
        const option = {
          label: x.brand + " " + x.model + " " + x.licensePlate,
          value: x.carId,
          defValue: false,
        };
        tempOptions.push(option);
      });
      setCarsOption(tempOptions);
    }
  }, [team]);

  const fetchAddTeam = () => {
    setLoading(true);
    axios
      .post(`${backendUrl()}/team/addTeam?eventId=${myEvent.eventId}`, team, {
        headers: authHeader(),
      })
      .then(() => {
        handleOk();
        handleClose();
      });
  };

  const handleChange = (event) => {
    setTeam({ ...team, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validation()) return;

    fetchAddTeam();
  };

  const validation = () => {
    let message = "";

    if (!team.currentCar) {
      message += "\nProszę wybrać lub dodać auto";
      setMsg(message);
      return false;
    }

    if (
      new Date(team.currentCar.insuranceExpiryDate).getTime() <
      new Date(myEvent.date).getTime()
    )
      message += "\nPolisa auta będzie nieaktualna w dniu wydarzenia";

    if (
      new Date(team.currentCar.carInspectionExpiryDate).getTime() <
      new Date(myEvent.date).getTime()
    )
      message += "\nPrzegląd auta będzie nieaktualny w dniu wydarzenia";

    if (message !== "") message += "\nNie można zapisać!";

    setMsg(message.startsWith("\n") ? message.substring(1) : message);
    return message === "";
  };

  useEffect(() => {
    setTimeout(() => setMsg(""), 8000);
  }, [msg]);

  return (
    <div>
      <Modal
        style={{ zIndex: addCar ? 1000 : 1055 }}
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="xl"
      >
        <Modal.Header className="bg-dark text-white" closeButton>
          <Modal.Title className="w-100 row">
            <div className="col-lg-8">
              {disable ? "Dane zawodnika" : `Panel zawodnika`}
            </div>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className={"px-3 py-0"}>
          <form id="teamForm" onSubmit={handleSubmit}>
            {team === undefined && (
              <div className="text-center">
                <Spinner animation="border" variant="secondary" size="lg" />
              </div>
            )}
            {team !== undefined && (
              <div className="row">
                <div className="col-lg-6 pb-3 px-1">
                  <Card className="text-center">
                    <Card.Header className="bg-dark text-white pt-1 pb-0">
                      <h5>Kierowca</h5>
                    </Card.Header>
                    <Card.Body>
                      <div className="row d-flex">
                        <div className="col-lg-12 px-1">
                          <InputLabeled
                            label="Imie i nazwisko"
                            name="driver"
                            handleChange={handleChange}
                            disabled={disable}
                            big={true}
                            value={team.driver}
                            icon={faUserAstronaut}
                            required={true}
                          />
                        </div>
                      </div>
                      <div className="row d-flex">
                        <div className="col-lg-6 px-1">
                          <InputLabeled
                            label="Nazwa Teamu"
                            name="teamName"
                            handleChange={handleChange}
                            disabled={disable}
                            big={true}
                            value={team.teamName}
                            icon={faUserFriends}
                          />
                        </div>
                        <div className="col-lg-6 px-1">
                          <InputLabeled
                            label="Automobilklub"
                            name="club"
                            handleChange={handleChange}
                            disabled={disable}
                            big={true}
                            value={team.club}
                            icon={faBuilding}
                          />
                        </div>
                      </div>
                      <div className="row mt-2">
                        <div className="col-lg-6 px-1">
                          <InputLabeled
                            label="Email"
                            name="email"
                            handleChange={handleChange}
                            disabled={disable}
                            big={true}
                            value={team.email}
                            icon={faAt}
                            required={true}
                          />
                        </div>
                        <div className="col-lg-6 px-1">
                          <InputLabeled
                            label="Nr. telefonu"
                            name="phone"
                            handleChange={handleChange}
                            disabled={disable}
                            big={true}
                            value={team.phone}
                            icon={faPhoneAlt}
                            required={true}
                            onlyNumber={true}
                          />
                        </div>
                      </div>
                      <div className="row mt-2">
                        <div className="col-lg-6 px-0">
                          <MyDatePicker
                            label={"Data urodzenia"}
                            onChange={(val) =>
                              setTeam({ ...team, birthDate: val })
                            }
                            selected={team.birthDate}
                            disabled={disable}
                          />
                        </div>
                        <div className="col-lg-6 px-1">
                          <InputLabeled
                            label="Nr. prawa jazdy"
                            name="drivingLicense"
                            handleChange={handleChange}
                            disabled={disable}
                            big={true}
                            value={team.drivingLicense}
                            required={true}
                          />
                        </div>
                      </div>
                      <div className="row mt-2">
                        <div className="col-lg-6 px-1">
                          <InputLabeled
                            label="Imię i nazwisko (wypadek)"
                            name="emergencyPerson"
                            handleChange={handleChange}
                            disabled={disable}
                            big={true}
                            value={team.emergencyPerson}
                            icon={faCarCrash}
                            required={true}
                          />
                        </div>
                        <div className="col-lg-6 px-1">
                          <InputLabeled
                            label="Nr. telefonu (wypadek)"
                            name="emergencyPhone"
                            handleChange={handleChange}
                            disabled={disable}
                            big={true}
                            value={team.emergencyPhone}
                            icon={faCarCrash}
                            required={true}
                            onlyNumber={true}
                          />
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
                <div className="col-lg-6 pb-3 px-1">
                  <Card className="text-center">
                    <Card.Header className="bg-dark text-white pt-1 pb-0">
                      <h5>Pilot</h5>
                    </Card.Header>
                    <Card.Body>
                      <div className="row mt-2 ">
                        <div className="col-lg-6 px-1">
                          <InputLabeled
                            label="Imie i nazwisko"
                            name="coDriver"
                            handleChange={handleChange}
                            disabled={disable}
                            big={true}
                            value={team.coDriver}
                            icon={faUserClock}
                          />
                        </div>
                        <div className="col-lg-6 px-1">
                          <InputLabeled
                            label="Automobilklub"
                            name="coClub"
                            handleChange={handleChange}
                            disabled={disable}
                            big={true}
                            value={team.coClub}
                            icon={faBuilding}
                          />
                        </div>
                      </div>
                      <div className="row mt-2 ">
                        <div className="col-lg-6 px-1">
                          <InputLabeled
                            label="Email"
                            name="coEmail"
                            handleChange={handleChange}
                            disabled={disable}
                            big={true}
                            value={team.coEmail}
                            icon={faAt}
                          />
                        </div>
                        <div className="col-lg-6 px-1">
                          <InputLabeled
                            label="Nr. telefonu"
                            name="coPhone"
                            handleChange={handleChange}
                            disabled={disable}
                            big={true}
                            value={team.coPhone}
                            icon={faPhoneAlt}
                            onlyNumber={true}
                          />
                        </div>
                      </div>
                      <div className="row mt-2 px-0">
                        <div className="col-lg-6 px-0">
                          <MyDatePicker
                            label={"Data urodzenia"}
                            onChange={(val) =>
                              setTeam({ ...team, coBirthDate: val })
                            }
                            selected={team.coBirthDate}
                            disabled={disable}
                          />
                        </div>
                        <div className="col-lg-6 px-1">
                          <InputLabeled
                            label="Nr. prawa jazdy"
                            name="coDrivingLicense"
                            handleChange={handleChange}
                            disabled={disable}
                            big={true}
                            value={team.coDrivingLicense}
                          />
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                  <Card className="text-center">
                    <Card.Header className="bg-dark text-white pt-1 pb-0">
                      {team.currentCar !== undefined &&
                      team.currentCar !== null ? (
                        <h5>{`Samochód:`}</h5>
                      ) : (
                        <h5>{`Dodaj samochód:`}</h5>
                      )}
                    </Card.Header>
                    <Card.Body>
                      <div className="d-flex justify-content-center pb-2">
                        {getCarLogo(team.currentCar?.brand, 35)}
                        <h5 className="px-2">{`${team.currentCar.brand} ${team.currentCar.model} ${team.currentCar.licensePlate}`}</h5>
                      </div>
                      {!disable && (
                        <>
                          <Selector
                            label={"Twoje auta"}
                            options={carsOption}
                            handleChange={(value) => {
                              setTeam({
                                ...team,
                                currentCar: team.cars.find(
                                  (x) => x.carId === value
                                ),
                              });
                            }}
                            isValid={true}
                            skipDefault={true}
                          />
                          <Button
                            className="m-1"
                            variant="primary"
                            onClick={() => {
                              fetchSaveTeam(team);
                              setAddCar(true);
                            }}
                          >
                            Dodaj samochód
                          </Button>
                          <Button
                            className="m-1"
                            variant="secondary"
                            onClick={() => setAddCar(team.currentCar)}
                          >
                            Edytuj
                          </Button>
                        </>
                      )}
                      {disable && (
                        <Button
                          className="m-1"
                          variant="secondary"
                          onClick={() => setAddCar(team.currentCar)}
                        >
                          Dane samochodu
                        </Button>
                      )}
                    </Card.Body>
                  </Card>
                </div>
              </div>
            )}
            <div className="text-center my-0">
              <h6 style={{ whiteSpace: "pre-line" }}>{msg}</h6>
              <h6 style={{ whiteSpace: "pre-line" }}>
                Uzupełnij profil danymi osobowymi oraz dodaj auto, po zapisaniu
                będziesz mógł zapisywać się na kolejne imprezy jednym
                kliknięciem.
              </h6>
              {loading && (
                <div className="text-center">
                  <Spinner animation="border" variant="secondary" size="lg" />
                </div>
              )}
              {!disable && (
                <Button
                  className={"m-1"}
                  variant="success"
                  type="submit"
                  //disabled={myEvent?.started}
                >
                  Zapisz się
                </Button>
              )}
              {disable && (
                <Button
                  className={"m-1"}
                  variant="success"
                  onClick={() =>
                    fetchTeamChecked(
                      myEvent?.eventId,
                      myEvent?.teamId,
                      true,
                      handleClose
                    )
                  }
                >
                  Zatwierdź pozytywny OA
                </Button>
              )}
              <Button
                className={"m-1"}
                variant="secondary"
                onClick={handleClose}
              >
                Zamknij okno
              </Button>
              {disable && (
                <Button
                  className={"m-1"}
                  variant="danger"
                  onClick={() =>
                    fetchTeamChecked(
                      myEvent?.eventId,
                      myEvent?.teamId,
                      false,
                      handleClose
                    )
                  }
                >
                  Negatywny OA
                </Button>
              )}
            </div>
          </form>
        </Modal.Body>
      </Modal>
      <CarPanelModal
        show={addCar}
        handleClose={() => {
          setAddCar(false);
          fetchTeam(team?.teamId);
        }}
        teamId={team?.teamId}
        carToEdit={addCar}
        mode={mode}
      />
    </div>
  );
};
