/* eslint-disable no-unused-vars */
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PGHOST:string
      PGUSER:string
      PGDATABASE:string
      PGPASSWORD:string
      PGPORT:string
      PGHOST_TEST:string
      PGUSER_TEST:string
      PGDATABASE_TEST:string
      PGPASSWORD_TEST:string
      PGPORT_TEST:string
    }
  }
}

export {};
