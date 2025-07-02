"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import useSWR from "swr";

const fetchData = async (url) => await fetch(url).then((res) => res.json());

export default function Home() {
  const { data, error, isLoading } = useSWR(
    "http://192.168.29.208:8000/api/get-all-event/",
    fetchData
  );
  useEffect(() => {}, [data]);

  return (
    <>
      <div className="container mt-5 mb-5">
        <h1>All Event</h1>
        <div className="row mt-5">
          {isLoading ? (
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : 
            data?.map((ele, index) => {
              return (
                <div className="col-md-3" key={index}>
                  <div className="card" style={{ width: "18rem" }}>
                    <div className="card-body">
                      <h5 className="card-title">Event - {index+1}</h5>
                      <h6 className="card-subtitle mb-2 text-body-secondary">
                        {ele.title}
                      </h6>
                      <p className="card-text">{ele.desc}</p>
                    </div>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
    </>
  );
}
