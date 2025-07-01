"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
export default function EventTable() {
  const [events, setevents] = useState([]);

  const [isLoading, setisLoading] = useState(false);
  const { data: session, status } = useSession();
  const fetchEvents = () => {
    setisLoading(true);
    try {
      fetch("http://192.168.34.182:8000/api/get-all-event/")
        .then((res) => res.json())
        .then((event) => {
          setevents(event);
        });
    } catch (error) {
      toast(error.message);
    } finally {
      setisLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user) {
      fetchEvents();
    }
  }, [session]);

  async function deleteData(id) {
    if (id) {
      var result = confirm("Are you sure delete the record ?");
      if (result) {
        const res = await fetch(
          `http://192.168.34.182:8000/api/delete-event/${id}/`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${session.token}`,
            },
          }
        );
        if (res.ok) {
          const response = await res.json();
          toast(response.msg);
          fetchEvents();
        }
      }
    }
  }

  return (
    <div className="container">
      <ToastContainer />

      <table className="table mt-5">
        <thead className="thead-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Venue</th>
            <th scope="col">Event Date</th>
            <th scope="col">Event Time</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          ) : (
            events.map((ele, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{ele.title}</td>
                  <td>{ele.venue}</td>
                  <td>{ele.date}</td>
                  <td>{ele.time}</td>
                  <td>
                    <Link
                      href={`/admin/events/update/${ele.id}/`}
                      className="btn btn-secondary btn-sm mx-2"
                    >
                      <i className="bi bi-pencil-square"></i>
                    </Link>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => deleteData(ele.id)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
