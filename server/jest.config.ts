export default {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "js", "json"],
  rootDir: "./",
  moduleDirectories: ["node_modules", "src"], // Adiciona a pasta "src" para importações absolutas
  moduleNameMapper: {
    "@models/(.*)": "<rootDir>/src/models/$1", // Mapeia os aliases de importação
    "@controllers/(.*)": "<rootDir>/src/controllers/$1",
  },
};
