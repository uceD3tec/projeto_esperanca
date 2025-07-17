import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AdminPainel() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [section, setSection] = useState("HOME");
  const [conteudos, setConteudos] = useState([]);

  const [editando, setEditando] = useState(null);
  const [form, setForm] = useState({
    contentName: "",
    description: "",
    image: null,
  });

  const [preview, setPreview] = useState("");
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState("");
  const inputFileRef = useRef(null);

  const secoes = [
    { label: "HOME", value: "HOME" },
    { label: "PROJETOS", value: "PROJETOS" },
    { label: "GESTÃO", value: "GESTAO" },
    { label: "HISTÓRIAS", value: "HISTORIAS" },
    { label: "SOBRE", value: "SOBRE" },
  ];

  useEffect(() => {
    if (token) fetchConteudos();
  }, [token, section]);

  useEffect(() => {
    if (token) localStorage.setItem("token", token);
  }, [token]);

  const login = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/admin/login", {
        username,
        password,
      });
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
      setTimeout(() => {
        localStorage.removeItem("token");
        setToken("");
      }, 5 * 60 * 1000); // 5 minutos
    } catch (err) {
      alert("Login inválido");
    }
  };

  const fetchConteudos = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/content/${section}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setConteudos(res.data);
    } catch (err) {
      setConteudos([]);
    }
  };

  const handleSubmit = async () => {
    if (!form.contentName || !form.description) return;

    const data = new FormData();
    data.append("contentName", form.contentName);
    data.append("description", form.description);
    data.append("section", section);
    if (form.image) data.append("image", form.image);

    try {
      if (editando) {
        await axios.put(`http://localhost:3000/api/content/${editando}`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        setFeedback("Conteúdo atualizado com sucesso!");
      } else {
        await axios.post("http://localhost:3000/api/content", data, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        setFeedback("Conteúdo publicado com sucesso!");
      }

      setFeedbackType("success");

      setForm({ contentName: "", description: "", image: null });
      setPreview("");
      setEditando(null);

      if (inputFileRef.current) {
        inputFileRef.current.value = "";
      }

      await fetchConteudos(section);

      setTimeout(() => {
        setFeedback("");
        setFeedbackType("");
      }, 5000);
    } catch (err) {
      setFeedback("Erro ao salvar conteúdo.");
      setFeedbackType("error");
      setTimeout(() => {
        setFeedback("");
        setFeedbackType("");
      }, 5000);
    }
  };

  const deletar = async (id) => {
    await axios.delete(`http://localhost:3000/api/content/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchConteudos();
  };

  const iniciarEdicao = (conteudo) => {
    setEditando(conteudo._id);
    setForm({
      contentName: conteudo.contentName,
      description: conteudo.description,
      image: null,
    });
    setPreview(conteudo.image || "");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="container py-5">
      <div className="text-center mb-4">
        <div
          style={{
            backgroundColor: "#c55d21ff",
            color: "#fff",
            display: "inline-block",
            padding: "10px 20px",
            borderRadius: "8px",
            fontSize: "2rem",
            fontWeight: "bold",
          }}
        >
          Projeto Esperança
        </div>
        <div
          style={{
            marginTop: "10px",
            fontSize: "1.2rem",
            color: "#555",
          }}
        >
          Painel de Admin
        </div>
      </div>

      {!token ? (
        <div className="mb-4">
          <input
            className="form-control mb-2"
            placeholder="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="form-control mb-2"
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={login} className="btn btn-warning">
            Entrar
          </button>
        </div>
      ) : (
        <>
          <div className="mb-4">
            <select
              className="form-select"
              value={section}
              onChange={(e) => setSection(e.target.value)}
            >
              {secoes.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <input
              className="form-control mb-2"
              placeholder="Nome do conteúdo"
              value={form.contentName}
              onChange={(e) =>
                setForm({ ...form, contentName: e.target.value })
              }
            />
            <textarea
              className="form-control mb-2"
              placeholder="Descrição"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
            {form.description.length > 0 && form.description.length < 10 && (
              <div className="text-danger mb-2">
                A descrição deve ter pelo menos 10 caracteres.
              </div>
            )}
            <input
              ref={inputFileRef}
              id="inputFile"
              type="file"
              className="form-control mb-2"
              accept="image/*"
              onChange={handleImageChange}
            />
            {preview && (
              <img
                src={
                  preview.startsWith("blob")
                    ? preview
                    : `http://localhost:3000${preview}`
                }
                alt="Preview"
                className="img-thumbnail mb-2"
                style={{ height: 80 }}
              />
            )}
            <div className="d-flex align-items-center gap-2 mt-2">
              <button onClick={handleSubmit} className="btn btn-warning">
                {editando ? "Atualizar" : "Publicar"}
              </button>
              {feedback && (
                <div
                  className={`alert ${
                    feedbackType === "error" ? "alert-danger" : "alert-success"
                  } mb-0 py-2 px-3 d-inline-block`}
                  style={{ maxWidth: "300px" }}
                >
                  {feedback}
                </div>
              )}
            </div>
          </div>

          <h2 className="mb-3">Conteúdos da seção {section}</h2>
          <ul className="list-group">
            {conteudos.map((c) => (
              <li
                key={c._id}
                className="list-group-item d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">{c.contentName}</div>
                  <div>{c.description}</div>
                  {c.image && (
                    <img
                      src={`http://localhost:3000${c.image}`}
                      alt="img"
                      className="img-thumbnail mt-2"
                      style={{ height: 80 }}
                    />
                  )}
                </div>
                <div className="btn-group">
                  <button
                    onClick={() => iniciarEdicao(c)}
                    className="btn btn-warning btn-sm"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => deletar(c._id)}
                    className="btn btn-danger btn-sm"
                  >
                    Deletar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
