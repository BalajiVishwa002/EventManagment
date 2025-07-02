"use client";
import { useSession } from "next-auth/react";
import { use, useEffect, useLayoutEffect, useState } from "react";
import { toast,ToastContainer } from "react-toastify";


export default  function GetEvent({ params }) {
  const { data: session, status } = useSession();
  
  const {id:paramid} = use(params);
  const [formdata, setData] = useState({
    title: "",
    description: "",
    venue: "",
    date: "",
    time: "",
  });

  const fetchEvent = async () =>
    await fetch(`http://192.168.29.208:8000/api/get-event/${paramid}/`)
      .then((res) => res.json())
      .then((events) => {
        console.log(events);
        setData(events);
      });

  useEffect(() => {
    if (session?.user) {
      fetchEvent();
    }
  }, [session]);

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  function showError(ele, msg) {
    const small = document.createElement("small");
    small.className = "error-text text-danger";
    small.textContent = msg;
    ele.classList.add("is-invalid");
    ele.parentElement.appendChild(small);
  }

  function clearError(ele) {
    ele.classList.remove("is-invalid");
  }

  function initCap(str) {
    return str.charAt(0).toLocaleUpperCase() + str.slice(1);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    var valid = true;
    document.querySelectorAll(".error-text").forEach((ele) => ele.remove());
    var keys = Object.keys(formdata);
    keys.forEach((ele) => {
      var docEle = document.getElementById(ele);
      if (keys.includes()) {
        if (!formdata[ele]) {
          showError(docEle, `${initCap(ele)} missing`);
          valid = false;
        } else {
          clearError(docEle);
        }
      }
    });

    if (valid) {
      var response = await fetch(
        "http://192.168.29.208:8000/api/update-event/",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${session.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formdata),
        }
      );
      const res = await response.json();
      toast(res.msg)
    }
  }

  return (
    <div className="container">
      <ToastContainer/>
      <div className="card mt-5">
        <form onSubmit={(e) => handleSubmit(e)} method="POST">
          <div className="card-header">Edits Event</div>
          <div className="card-body">
            <div className="row">
              <div className="mb-3 col-md-4">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  onChange={(e) => handleChanges(e)}
                  className="form-control"
                  id="title"
                  value={formdata.title}
                  name="title"
                  placeholder="Enter the title"
                />
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  className="form-control"
                  onChange={(e) => handleChanges(e)}
                  id="description"
                  name="description"
                  rows="3"
                  defaultValue={formdata.description}
                ></textarea>
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="title" className="form-label">
                  Venue
                </label>
                <input
                  type="text"
                  onChange={(e) => handleChanges(e)}
                  className="form-control"
                  id="venue"
                  value={formdata.venue}
                  name="venue"
                  placeholder="Enter the title"
                />
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="title" className="form-label">
                  Date
                </label>
                <input
                  type="date"
                  onChange={(e) => handleChanges(e)}
                  className="form-control"
                  id="date"
                  value={formdata.date}
                  name="date"
                  placeholder="Enter the title"
                />
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="title" className="form-label">
                  Time
                </label>
                <input
                  type="time"
                  onChange={(e) => handleChanges(e)}
                  className="form-control"
                  id="time"
                  value={formdata.time}
                  name="time"
                  placeholder="Enter the title"
                />
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3 mx-2">
            <input type="submit" className="btn btn-primary" value="Submit" />
          </div>
        </form>
      </div>
    </div>
  );
}
