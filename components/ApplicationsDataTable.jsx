import { change_application_status } from "@/Services/job";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { toast } from "react-toastify";

export default function ApplicationsDataTable({ application }) {
  const router = useRouter();
  const [Data, setData] = useState([]);

  useEffect(() => {
    setData(application);
  }, [application]);

  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setFilteredData(Data);
  }, [Data]);
  const handleAcceptStatus = async (id) => {
    const data = { id, status: "accepted" };
    const res = await change_application_status(data);
    if (res.success) {
      router.push("/frontend/postedJob");
    } else {
      toast.error(res.message);
    }
  };
  const handleRejectStatus = async (id) => {
    const data = { id, status: "rejected" };
    const res = await change_application_status(data);
    if (res.success) {
      router.push("/frontend/postedJob");
    } else {
      toast.error(res.message);
    }
  };

  const handleDownloadCV = async (id, filename) => {
    const fileUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/media/download/${id}`;

    fetch(fileUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const blobURL = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.style.display = "none";
        document.body.appendChild(link);
        link.setAttribute("href", blobURL);
        link.setAttribute("download", filename);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error("Error downloading PDF:", error);
      });
  };
  const columns = [
    {
      name: "Name",
      selector: (row) => row?.user_id?.name,
    },
    {
      name: "Email",
      selector: (row) => row?.user_id?.email,
    },
    {
      name: "Status",
      selector: (row) => (
        <p
          className={`uppercase font-semibold ${
            row?.status === "approved" ? "text-green-500" : ""
          }  ${row?.status === "rejected" ? "text-red-600" : ""}`}
        >
          {row?.status}
        </p>
      ),
    },
    {
      name: "CV",
      selector: (row) => (
        <button
          onClick={() =>
            handleDownloadCV(row?.media_id?._id, row?.media_id?.filename)
          }
          className=" w-20 py-2 text-xs text-indigo-600 hover:text-white my-2 hover:bg-indigo-600 border border-indigo-600 rounded transition-all duration-700"
        >
          Download CV
        </button>
      ),
    },
    {
      name: "Status",
      selector: (row) => (
        <p
          className={`uppercase font-semibold ${
            row?.status === "approved" ? "text-green-500" : ""
          }  ${row?.status === "rejected" ? "text-red-600" : ""}`}
        >
          {row?.status}
        </p>
      ),
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center justify-start w-72 h-20">
          <button
            onClick={() =>
              router.push(`/frontend/applicationDetail/${row?._id}`)
            }
            className=" w-20 py-2 mx-2 text-xs text-indigo-600 hover:text-white my-2 hover:bg-indigo-600 border border-indigo-600 rounded transition-all duration-700"
          >
            Details
          </button>
          {row?.status !== "approved" && (
            <>
              <button
                onClick={() => handleAcceptStatus(row?._id)}
                className=" w-20 py-2 mx-2 text-xs text-green-600 hover:text-white my-2 hover:bg-green-600 border border-green-600 rounded transition-all duration-700"
              >
                Approved
              </button>
              <button
                onClick={() => handleRejectStatus(row?._id)}
                className=" w-20 py-2 mx-2 text-xs text-red-600 hover:text-white my-2 hover:bg-red-600 border border-red-600 rounded transition-all duration-700"
              >
                Reject
              </button>
            </>
          )}
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (search === "") {
      setFilteredData(Data);
    } else {
      setFilteredData(
        Data?.filter((item) => {
          const itemData = item?.user_id?.name.toUpperCase();
          const textData = search.toUpperCase();
          return itemData.indexOf(textData) > -1;
        })
      );
    }
  }, [search, Data]);

  return (
    <>
      <DataTable
        subHeaderAlign={"right"}
        columns={columns}
        data={filteredData}
        keyField="id"
        pagination
        title={`Total Applications : ${Data?.length}`}
        fixedHeader
        fixedHeaderScrollHeight="79%"
        selectableRows
        selectableRowsHighlight
        subHeader
        persistTableHead
        subHeaderComponent={
          <input
            className="w-60  py-2 px-2  outline-none  border-b-2 border-indigo-600"
            type={"search"}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={"Search with Applicant  name..."}
          />
        }
        className="h-screen bg-white"
      />
    </>
  );
}
