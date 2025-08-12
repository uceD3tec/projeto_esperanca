import mongoose from "mongoose";

const validSections = ["HOME", "PROJETOS", "GESTAO", "HISTORIAS", "SOBRE"];

const contentSchema = new mongoose.Schema(
  {
    contentName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    section: {
      type: String,
      required: true,
      enum: {
        values: validSections,
        message:
          "Seção digitada é inválida. Use: HOME, PROJETOS, GESTAO, HISTORIAS ou SOBRE.",
      },
    },
    description: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 1000,
    },
    image: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

export const Content = mongoose.model("Content", contentSchema);
