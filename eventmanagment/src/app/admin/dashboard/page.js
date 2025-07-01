"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [values, setdata] = useState({ event_count: 0, last_login: "" });

  console.log(status);

  const fetchData = async () =>
    await fetch("http://192.168.34.182:8000/api/dashboard/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session.token}`,
      },
    })
      .then((res) => res.json())
      .then((datas) => setdata(datas));

  useEffect(() => {
    if (session?.user) {
      fetchData();
    }
  }, [session]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4 mt-5">
          <div className="card" style={{ width: "18rem" }}>
            <div className="card-body">
              <h5 className="card-title">No of Event</h5>
              <h6 className="card-subtitle mb-2 text-body-secondary">
                {values.event_count}
              </h6>
            </div>
          </div>
        </div>
        <div className="col-md-4 mt-5">
          <div className="card" style={{ width: "18rem" }}>
            <div className="card-body">
              <h5 className="card-title">Last Login</h5>
              <h6 className="card-subtitle mb-2 text-body-secondary">
                {values.last_login}
              </h6>
            </div>
          </div>
        </div>
        <div className="col-md-4 mt-5">
          <div className="card" style={{ width: "18rem" }}>
            <div className="card-body">
              <h5 className="card-title">Next Evet</h5>
              <h6 className="card-subtitle mb-2 text-body-secondary">Title</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
