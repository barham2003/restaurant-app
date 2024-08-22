import { Injectable } from "@nestjs/common";
import { MongooseModuleOptions, MongooseOptionsFactory } from "@nestjs/mongoose";

export default () => ({
  database: {
    host: process.env.DB_URL
  }
})

