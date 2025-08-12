import { Content } from "../models/Content.js";

export async function createContent(req, res) {
  try {
    const { section, contentName, description } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const newContent = new Content({
      contentName,
      section: section.toUpperCase(),
      description,
      image,
    });

    await newContent.save();

    const timestamp = new Date().toLocaleString("pt-BR", {
      timeZone: "America/Sao_Paulo",
    });
    console.log(
      `[${timestamp}] Novo conteúdo publicado | Seção: ${section.toUpperCase()} | Nome: ${contentName}`
    );

    res.status(201).json(newContent);
  } catch (err) {
    console.log("Erro: ", err);
    res
      .status(400)
      .json({ message: "Erro ao criar conteúdo.", error: err.message });
  }
}

export async function updateContent(req, res) {
  try {
    const { id } = req.params;
    const { section, contentName, description } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : undefined;

    const updated = await Content.findByIdAndUpdate(
      id,
      {
        ...(section && { section: section.toUpperCase() }),
        ...(contentName && { contentName: contentName }),
        ...(image !== undefined && { image }),
        ...(description && { description }),
      },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Conteúdo não encontrado." });
    }

    const timestamp = new Date().toLocaleString("pt-BR", {
      timeZone: "America/Sao_Paulo",
    });
    console.log(
      `[${timestamp}] Conteúdo atualizado | Seção: ${updated.section} | Nome: ${updated.contentName}`
    );

    res.status(200).json(updated);
  } catch (err) {
    console.log("Erro: ", err);
    res
      .status(400)
      .json({ message: "Erro ao atualizar conteúdo.", error: err.message });
  }
}

export async function deleteContent(req, res) {
  try {
    const { id } = req.params;

    const deleted = await Content.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Conteúdo não encontrado." });
    }

    const timestamp = new Date().toLocaleString("pt-BR", {
      timeZone: "America/Sao_Paulo",
    });
    console.log(
      `[${timestamp}] Conteúdo deletado | Seção: ${deleted.section} | Nome: ${deleted.contentName}`
    );

    res.status(200).json({ message: "Conteúdo deletado com sucesso." });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erro ao deletar conteúdo.", error: err.message });
  }
}

export async function getBySection(req, res) {
  try {
    const section = req.params.section.toUpperCase();

    if (!validSections.includes(section)) {
      return res.status(400).json({ message: "Seção inválida." });
    }

    const contents = await Content.find({ section });

    res.status(200).json(contents);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erro ao buscar conteúdos.", error: err.message });
  }
}

const validSections = ["HOME", "PROJETOS", "GESTAO", "HISTORIAS", "SOBRE"];
