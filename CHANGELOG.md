Changelog

# 1.0.0 (2023-12-29)


### Bug Fixes

* applied security fixes ([d781439](https://github.com/eTrustyMPC/backend-v2/commit/d781439ccb7f53f430db52918ad4be0684db841e))
* changed main access context scope to organization ([32ff670](https://github.com/eTrustyMPC/backend-v2/commit/32ff670fca5d4a2b05fb9ea068f986447bbd678f))
* fixed .env config ([1f25ef7](https://github.com/eTrustyMPC/backend-v2/commit/1f25ef7fa19c20b15138a2df31069e398a6caacb))
* fixed auth class name ([99c863a](https://github.com/eTrustyMPC/backend-v2/commit/99c863aa3a6576ae24ea3bcc51eb3b3c03d726ec))


### Features

* added a /login and /signnup endpoints ([08a41c2](https://github.com/eTrustyMPC/backend-v2/commit/08a41c298ef142d7db8ba3b1d2e3bf041cc09778))
* added env config ([9d19760](https://github.com/eTrustyMPC/backend-v2/commit/9d197607bb74678422ae39372600a84ed3ec8d2f))
* added JWT auth component ([97accaf](https://github.com/eTrustyMPC/backend-v2/commit/97accaf67290c0a793dd09b4ac800f7fa4a83326))
* added missing relations ([3aaeccf](https://github.com/eTrustyMPC/backend-v2/commit/3aaeccf38b7641d9f5bb0c6f5bd3680d7f0a914e))
* added model classes and set up repository ([7958612](https://github.com/eTrustyMPC/backend-v2/commit/7958612826c5308550ac6edb7c7b882a5c7f168f))
* added nodemon config, updated docs, updated npm scripts ([a60d6c1](https://github.com/eTrustyMPC/backend-v2/commit/a60d6c1a31938c21195289f6df3c312be5ed0535))
* added Organization model ([8b9f970](https://github.com/eTrustyMPC/backend-v2/commit/8b9f9703a45f00dee93e3fa29afc76eef598e587))
* added Organization/Person relations ([1a4543d](https://github.com/eTrustyMPC/backend-v2/commit/1a4543d84da4fe2327d717b0a60a1d2569fc3dca))
* added passport auth strategy support ([eb3cd50](https://github.com/eTrustyMPC/backend-v2/commit/eb3cd5059dc079504d308e6dc69b2c446b6e04ad))
* added Postgres datasource ([0358ba1](https://github.com/eTrustyMPC/backend-v2/commit/0358ba1d6c7848e91393b1502657c4e8d42d88a3))
* added relations Tender->Person ([e4fe2ac](https://github.com/eTrustyMPC/backend-v2/commit/e4fe2acfe172bc2775b33afc9e4afc29d3648691))
* added relations: Lot entity ([1793458](https://github.com/eTrustyMPC/backend-v2/commit/17934587c529f63017606c4e51018de0dcc65438))
* added relations: Offer ([5f96ec5](https://github.com/eTrustyMPC/backend-v2/commit/5f96ec5f6d556aa8cd1d849ef829b2d284d68c1f))
* added relations: Review, Offer, Lot ([9f4611e](https://github.com/eTrustyMPC/backend-v2/commit/9f4611e363084cf65b4d5e54994547bba6206d8f))
* added repository classes ([289d4a9](https://github.com/eTrustyMPC/backend-v2/commit/289d4a9f78ed3d8b86319e0608d69c0a513bc98d))
* **auth:** added User auth controller, updated User model ([8781309](https://github.com/eTrustyMPC/backend-v2/commit/87813098eeb55bd5a3bb33c3f9d804f0d569f281))
* added User auth e2e tests and Tender API ([50ced11](https://github.com/eTrustyMPC/backend-v2/commit/50ced111d523f6c9168be89d3e01c07d53748203))
* **user:** added User model with multi-tennancy support ([c75daf1](https://github.com/eTrustyMPC/backend-v2/commit/c75daf1e69ae6f94648260c5c8b2a0d837b3c4cc))
* added v1 Partisia blockchain sync lib from old API ([b6ac3b0](https://github.com/eTrustyMPC/backend-v2/commit/b6ac3b055aefc1f482c230d4cb039b721b44766a))
* **user:** connected JWT auth component ([cdb7c3d](https://github.com/eTrustyMPC/backend-v2/commit/cdb7c3d6914fa764d1848c0fa0cc664800b62783))
* controllers grouped by tags ([994ba7c](https://github.com/eTrustyMPC/backend-v2/commit/994ba7c91b7bc7e5c5edba6f0b10ab2b25e07f8e))
* initial commit ([f066500](https://github.com/eTrustyMPC/backend-v2/commit/f0665005be0b533eea45e653ae51fea588e07f9a))
* installed authentification plugin ([524efbe](https://github.com/eTrustyMPC/backend-v2/commit/524efbe789ffc298b71191cfc8019da721e978ca))
* **user:** set up authorization component ([a4f2fe5](https://github.com/eTrustyMPC/backend-v2/commit/a4f2fe57d43eb6f5fb2445b376cc114a5d943353))
* set up dynamic repositories and controllers via boot script ([9b0f380](https://github.com/eTrustyMPC/backend-v2/commit/9b0f380c5b66bf5787e0e69bc5330fb339148a50))
* set up model boot scripts ([e812c60](https://github.com/eTrustyMPC/backend-v2/commit/e812c60f96d667d530cb4877f9e2e6e95cd8be82))
* set up multi-tenant strategies ([68e5a94](https://github.com/eTrustyMPC/backend-v2/commit/68e5a94a8ccd8e1f2659495d100ccd3550b938e0))
* set up nested CRUD component ([28daf41](https://github.com/eTrustyMPC/backend-v2/commit/28daf4117e282237b502b845e4c26c841784eb15))
* set up roles/policies files ([e1aa1a7](https://github.com/eTrustyMPC/backend-v2/commit/e1aa1a7f07a5c61fecd18e8f8b53ffa049f43bfa))
* updated dependencies, added logger extension ([51ff864](https://github.com/eTrustyMPC/backend-v2/commit/51ff86490a74acbcc298fd171f069f57ced74687))
* updated Person API ([2dc60c2](https://github.com/eTrustyMPC/backend-v2/commit/2dc60c2910415ced272f927cdcb9cfb36001ba10))
* wIP: added auth routes ([2926d5a](https://github.com/eTrustyMPC/backend-v2/commit/2926d5a60edf3cf212c1fa13b4bcee68ff1eabc6))


### Reverts

* disabled logger ([fcfea04](https://github.com/eTrustyMPC/backend-v2/commit/fcfea04b326104e08549bb622f819fb8b0246613))

# 1.0.0 (2023-12-29)


### Bug Fixes

* applied security fixes ([d781439](https://github.com/eTrustyMPC/backend-v2/commit/d781439ccb7f53f430db52918ad4be0684db841e))
* changed main access context scope to organization ([32ff670](https://github.com/eTrustyMPC/backend-v2/commit/32ff670fca5d4a2b05fb9ea068f986447bbd678f))
* fixed .env config ([1f25ef7](https://github.com/eTrustyMPC/backend-v2/commit/1f25ef7fa19c20b15138a2df31069e398a6caacb))
* fixed auth class name ([99c863a](https://github.com/eTrustyMPC/backend-v2/commit/99c863aa3a6576ae24ea3bcc51eb3b3c03d726ec))


### Features

* added a /login and /signnup endpoints ([08a41c2](https://github.com/eTrustyMPC/backend-v2/commit/08a41c298ef142d7db8ba3b1d2e3bf041cc09778))
* added env config ([9d19760](https://github.com/eTrustyMPC/backend-v2/commit/9d197607bb74678422ae39372600a84ed3ec8d2f))
* added JWT auth component ([97accaf](https://github.com/eTrustyMPC/backend-v2/commit/97accaf67290c0a793dd09b4ac800f7fa4a83326))
* added missing relations ([3aaeccf](https://github.com/eTrustyMPC/backend-v2/commit/3aaeccf38b7641d9f5bb0c6f5bd3680d7f0a914e))
* added model classes and set up repository ([7958612](https://github.com/eTrustyMPC/backend-v2/commit/7958612826c5308550ac6edb7c7b882a5c7f168f))
* added nodemon config, updated docs, updated npm scripts ([a60d6c1](https://github.com/eTrustyMPC/backend-v2/commit/a60d6c1a31938c21195289f6df3c312be5ed0535))
* added Organization model ([8b9f970](https://github.com/eTrustyMPC/backend-v2/commit/8b9f9703a45f00dee93e3fa29afc76eef598e587))
* added Organization/Person relations ([1a4543d](https://github.com/eTrustyMPC/backend-v2/commit/1a4543d84da4fe2327d717b0a60a1d2569fc3dca))
* added passport auth strategy support ([eb3cd50](https://github.com/eTrustyMPC/backend-v2/commit/eb3cd5059dc079504d308e6dc69b2c446b6e04ad))
* added Postgres datasource ([0358ba1](https://github.com/eTrustyMPC/backend-v2/commit/0358ba1d6c7848e91393b1502657c4e8d42d88a3))
* added relations Tender->Person ([e4fe2ac](https://github.com/eTrustyMPC/backend-v2/commit/e4fe2acfe172bc2775b33afc9e4afc29d3648691))
* added relations: Lot entity ([1793458](https://github.com/eTrustyMPC/backend-v2/commit/17934587c529f63017606c4e51018de0dcc65438))
* added relations: Offer ([5f96ec5](https://github.com/eTrustyMPC/backend-v2/commit/5f96ec5f6d556aa8cd1d849ef829b2d284d68c1f))
* added relations: Review, Offer, Lot ([9f4611e](https://github.com/eTrustyMPC/backend-v2/commit/9f4611e363084cf65b4d5e54994547bba6206d8f))
* added repository classes ([289d4a9](https://github.com/eTrustyMPC/backend-v2/commit/289d4a9f78ed3d8b86319e0608d69c0a513bc98d))
* **auth:** added User auth controller, updated User model ([8781309](https://github.com/eTrustyMPC/backend-v2/commit/87813098eeb55bd5a3bb33c3f9d804f0d569f281))
* added User auth e2e tests and Tender API ([50ced11](https://github.com/eTrustyMPC/backend-v2/commit/50ced111d523f6c9168be89d3e01c07d53748203))
* **user:** added User model with multi-tennancy support ([c75daf1](https://github.com/eTrustyMPC/backend-v2/commit/c75daf1e69ae6f94648260c5c8b2a0d837b3c4cc))
* added v1 Partisia blockchain sync lib from old API ([b6ac3b0](https://github.com/eTrustyMPC/backend-v2/commit/b6ac3b055aefc1f482c230d4cb039b721b44766a))
* **user:** connected JWT auth component ([cdb7c3d](https://github.com/eTrustyMPC/backend-v2/commit/cdb7c3d6914fa764d1848c0fa0cc664800b62783))
* controllers grouped by tags ([994ba7c](https://github.com/eTrustyMPC/backend-v2/commit/994ba7c91b7bc7e5c5edba6f0b10ab2b25e07f8e))
* initial commit ([f066500](https://github.com/eTrustyMPC/backend-v2/commit/f0665005be0b533eea45e653ae51fea588e07f9a))
* installed authentification plugin ([524efbe](https://github.com/eTrustyMPC/backend-v2/commit/524efbe789ffc298b71191cfc8019da721e978ca))
* **user:** set up authorization component ([a4f2fe5](https://github.com/eTrustyMPC/backend-v2/commit/a4f2fe57d43eb6f5fb2445b376cc114a5d943353))
* set up dynamic repositories and controllers via boot script ([9b0f380](https://github.com/eTrustyMPC/backend-v2/commit/9b0f380c5b66bf5787e0e69bc5330fb339148a50))
* set up model boot scripts ([e812c60](https://github.com/eTrustyMPC/backend-v2/commit/e812c60f96d667d530cb4877f9e2e6e95cd8be82))
* set up multi-tenant strategies ([68e5a94](https://github.com/eTrustyMPC/backend-v2/commit/68e5a94a8ccd8e1f2659495d100ccd3550b938e0))
* set up nested CRUD component ([28daf41](https://github.com/eTrustyMPC/backend-v2/commit/28daf4117e282237b502b845e4c26c841784eb15))
* set up roles/policies files ([e1aa1a7](https://github.com/eTrustyMPC/backend-v2/commit/e1aa1a7f07a5c61fecd18e8f8b53ffa049f43bfa))
* updated dependencies, added logger extension ([51ff864](https://github.com/eTrustyMPC/backend-v2/commit/51ff86490a74acbcc298fd171f069f57ced74687))
* updated Person API ([2dc60c2](https://github.com/eTrustyMPC/backend-v2/commit/2dc60c2910415ced272f927cdcb9cfb36001ba10))
* wIP: added auth routes ([2926d5a](https://github.com/eTrustyMPC/backend-v2/commit/2926d5a60edf3cf212c1fa13b4bcee68ff1eabc6))


### Reverts

* disabled logger ([fcfea04](https://github.com/eTrustyMPC/backend-v2/commit/fcfea04b326104e08549bb622f819fb8b0246613))
* added nodemon config, updated docs, updated npm scripts ([a60d6c1](https://github.com/eTrustyMPC/backend-v2/commit/a60d6c1a31938c21195289f6df3c312be5ed0535))
* added Organization model ([8b9f970](https://github.com/eTrustyMPC/backend-v2/commit/8b9f9703a45f00dee93e3fa29afc76eef598e587))
* **auth:** added User auth controller, updated User model ([8781309](https://github.com/eTrustyMPC/backend-v2/commit/87813098eeb55bd5a3bb33c3f9d804f0d569f281))
* added User auth e2e tests and Tender API ([50ced11](https://github.com/eTrustyMPC/backend-v2/commit/50ced111d523f6c9168be89d3e01c07d53748203))
* **user:** added User model with multi-tennancy support ([c75daf1](https://github.com/eTrustyMPC/backend-v2/commit/c75daf1e69ae6f94648260c5c8b2a0d837b3c4cc))
* **user:** connected JWT auth component ([cdb7c3d](https://github.com/eTrustyMPC/backend-v2/commit/cdb7c3d6914fa764d1848c0fa0cc664800b62783))
* initial commit ([f066500](https://github.com/eTrustyMPC/backend-v2/commit/f0665005be0b533eea45e653ae51fea588e07f9a))
* **user:** set up authorization component ([a4f2fe5](https://github.com/eTrustyMPC/backend-v2/commit/a4f2fe57d43eb6f5fb2445b376cc114a5d943353))
* set up multi-tenant strategies ([68e5a94](https://github.com/eTrustyMPC/backend-v2/commit/68e5a94a8ccd8e1f2659495d100ccd3550b938e0))
* set up nested CRUD component ([28daf41](https://github.com/eTrustyMPC/backend-v2/commit/28daf4117e282237b502b845e4c26c841784eb15))
