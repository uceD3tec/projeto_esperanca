import { Content } from "../models/Content.js";

export async function createContent(req, res) {
  try {

    //Validação da requisição
    const { section, contentName, description } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    //Mapeando a requisição
    const newContent = new Content({
      contentName,
      section: section.toUpperCase(),
      description,
      image,
    });


    // salva o content no db
    await newContent.save();


    // Registro de log
    const timestamp = new Date().toLocaleString("pt-BR", {
      timeZone: "America/Sao_Paulo",
    });
    console.log(
      `[${timestamp}] Novo conteúdo publicado | Seção: ${section.toUpperCase()} | Nome: ${contentName}`
    );

    //resposta ao cliente
    res.status(201).json(newContent);
  } catch (err) {
    console.log("Erro: ", err);
    res
      .status(400)
      .json({ message: "Erro ao criar conteúdo.", error: err.message });
  }
}

//Edit a publicação
export async function updateContent(req, res) {
  try {

    //valida a requisição

    //verifica e armazena o ID do conteudo
    const { id } = req.params;
    //verifica e armazena o conteudo do body
    const { section, contentName, description } = req.body;

    //verifico se a imagem foi enviada na requisição
    const image = req.file ? `/uploads/${req.file.filename}` : undefined;

    //busca no banco de dados o conteudo e atualiza
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


    //logs
    const timestamp = new Date().toLocaleString("pt-BR", {
      timeZone: "America/Sao_Paulo",
    });
    console.log(
      `[${timestamp}] Conteúdo atualizado | Seção: ${updated.section} | Nome: ${updated.contentName}`
    );

    //resposta ao cliente
    res.status(200).json(updated);
  } catch (err) {
    console.log("Erro: ", err);
    res
      .status(400)
      .json({ message: "Erro ao atualizar conteúdo.", error: err.message });
  }
}

// deleta a publicação
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

export async function findByContent(req,res){
  try{
    // pego a query direto da request
    const {query} = req.query;
    
    //Transformo a expressão regular para um busca
    // 'i' para ignorar maiúsculas e minúsculas
    const searchRegex = new RegExp(query,'i');

    // buscar no db
    const result = await Content.find({
      //busca pelo nome ou algo escrito na descrição do conteudo:
      $or:[
        {contentName: {$regex: searchRegex}},
        {description: {$regex: searchRegex}}
      ]
    });

    if(result.length === 0){
      return res.status(404).json({ message: "Nenhum conteúdo encontrado." });
    }

    res.status(200).json(result);

  }catch(error){
    res
      .status(500)
      .json({ message: "Erro ao pesquisar conteúdos.", error: err.message });
  }
}

export async function findByContentInSection(req,res){
  try{
    const section = req.params.section.toUpperCase();
    const {query} = req.query;

    if (!validSections.includes(section)) {
      return res.status(400).json({ message: "Seção inválida." });
    }

    const searchRegex = new RegExp(query, 'i');

    const contents = await Content.find({
      section,
      $or:[
        {contentName: {$regex: searchRegex}},
        {description: {$regex: searchRegex}}
      ]
    });

    if (contents.length === 0) {
      return res.status(404).json({ message: "Nenhum conteúdo encontrado." });
    }

    res.status(200).json(contents);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao pesquisar conteúdos.", error: error.message });
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
