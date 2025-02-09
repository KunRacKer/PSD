import React, { useState } from "react";

const PredictionPages = () => {
  const [formData, setFormData] = useState({
    judul: "",
    periode_pembayaran: "",
    jenis_pekerjaan_terformat: "",
    lokasi: "",
    tipe_pendaftaran: "",
    tingkat_pengalaman_terformat: "",
    disponsori: "",
    jenis_pekerjaan: "",
    nama_kemampuan: "",
  });

  const [loading, setLoading] = useState(false);
  const [hasilGaji, setHasilGaji] = useState("Belum ada hasil");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "https://9789-34-139-230-105.ngrok-free.app/predict",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            disponsori: parseInt(formData.disponsori),
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API Error: ${errorText}`);
      }

      const result = await response.json();
      setHasilGaji(result.kategori_gaji);
    } catch (error) {
      setHasilGaji(`Terjadi kesalahan: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-light p-3 p-md-4 p-xl-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-9 col-lg-7 col-xl-6 col-xxl-8">
            <div className="card border border-light-subtle rounded-4">
              <div className="card-body p-3 p-md-4 p-xl-5">
                <h4 className="text-center">APLIKASI REKOMENDASI PEKERJAAN</h4>
                <form onSubmit={handleSubmit}>
                  <div className="row gy-3 overflow-hidden">
                    {[
                      { id: "judul", label: "Nama Pekerjaan", type: "text" },
                      { id: "lokasi", label: "Lokasi", type: "text" },
                      {
                        id: "tipe_pendaftaran",
                        label: "Tipe Pendaftaran",
                        type: "text",
                      },
                      { id: "disponsori", label: "Disponsori", type: "number" },
                      {
                        id: "nama_kemampuan",
                        label: "Nama Kemampuan",
                        type: "text",
                      },
                    ].map((field) => (
                      <div className="col-12" key={field.id}>
                        <div className="form-floating mb-3">
                          <input
                            type={field.type}
                            className="form-control"
                            id={field.id}
                            value={formData[field.id]}
                            onChange={handleChange}
                            placeholder={field.label}
                            required
                          />
                          <label htmlFor={field.id}>{field.label}</label>
                        </div>
                      </div>
                    ))}

                    {[
                      {
                        id: "periode_pembayaran",
                        label: "Periode Pembayaran",
                        options: ["HOURLY", "MONTHLY", "YEARLY"],
                      },
                      {
                        id: "jenis_pekerjaan_terformat",
                        label: "Jenis Pekerjaan Terformat",
                        options: ["Full-time", "Part-time"],
                      },
                      {
                        id: "tingkat_pengalaman_terformat",
                        label: "Tingkat Pengalaman",
                        options: [
                          "Entry level",
                          "Mid-Senior level",
                          "Senior level",
                        ],
                      },
                      {
                        id: "jenis_pekerjaan",
                        label: "Jenis Pekerjaan",
                        options: ["Full-time", "Part-time"],
                      },
                    ].map((selectField) => (
                      <div className="col-12" key={selectField.id}>
                        <div className="form-floating mb-3">
                          <select
                            className="form-select"
                            id={selectField.id}
                            value={formData[selectField.id]}
                            onChange={handleChange}
                            required
                          >
                            <option disabled value="">
                              Pilih {selectField.label}
                            </option>
                            {selectField.options.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                          <label htmlFor={selectField.id}>
                            {selectField.label}
                          </label>
                        </div>
                      </div>
                    ))}

                    <div className="col-12">
                      <div className="d-grid justify-content-center">
                        <button
                          className="btn bsb-btn-xl btn-primary"
                          type="submit"
                          disabled={loading}
                        >
                          {loading ? "Memproses..." : "Generate"}
                        </button>
                      </div>
                    </div>

                    {loading && (
                      <div className="col-12 text-center">
                        <div
                          className="spinner-border text-primary"
                          role="status"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        <p>Memproses data...</p>
                      </div>
                    )}

                    <div className="col-12 mt-4">
                      <div className="card">
                        <div className="card-body">
                          <h5 className="card-title">HASIL KATEGORI GAJI</h5>
                          <h6 className="card-text">
                            Kategori Gaji Adalah: {hasilGaji}
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionPages;
