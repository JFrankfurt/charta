export const PermissionEvents = 
{
  "contractName": "PermissionEvents",
  "abi": [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "agent",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "callingContext",
          "type": "string"
        }
      ],
      "name": "Authorized",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "agent",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "callingContext",
          "type": "string"
        }
      ],
      "name": "AuthorizationRevoked",
      "type": "event"
    }
  ],
  "bytecode": "0x60606040523415600e57600080fd5b603580601b6000396000f3006060604052600080fd00a165627a7a72305820a74c93c2b8ef9949c75a76b59ba625d58a672915de60921a556e6a39e22c5e540029",
  "deployedBytecode": "0x6060604052600080fd00a165627a7a72305820a74c93c2b8ef9949c75a76b59ba625d58a672915de60921a556e6a39e22c5e540029",
  "sourceMap": "979:175:16:-;;;;;;;;;;;;;;;;;",
  "deployedSourceMap": "979:175:16:-;;;;;",
  "source": "/*\n\n  Copyright 2017 Dharma Labs Inc.\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n\n*/\n\npragma solidity 0.4.18;\n\n\n/**\n *  Note(kayvon): these events are emitted by our PermissionsLib, but all contracts that\n *  depend on the library must also define the events in order for web3 clients to pick them up.\n *  This topic is discussed in greater detail here (under the section \"Events and Libraries\"):\n *  https://blog.aragon.one/library-driven-development-in-solidity-2bebcaf88736\n */\ncontract PermissionEvents {\n    event Authorized(address indexed agent, string callingContext);\n    event AuthorizationRevoked(address indexed agent, string callingContext);\n}\n\n\nlibrary PermissionsLib {\n\n    // TODO(kayvon): remove these events and inherit from PermissionEvents when libraries are\n    // capable of inheritance.\n    // See relevant github issue here: https://github.com/ethereum/solidity/issues/891\n    event Authorized(address indexed agent, string callingContext);\n    event AuthorizationRevoked(address indexed agent, string callingContext);\n\n    struct Permissions {\n        mapping (address => bool) authorized;\n        mapping (address => uint) agentToIndex; // ensures O(1) look-up\n        address[] authorizedAgents;\n    }\n\n    function authorize(\n        Permissions storage self,\n        address agent,\n        string callingContext\n    )\n        internal\n    {\n        require(isNotAuthorized(self, agent));\n\n        self.authorized[agent] = true;\n        self.authorizedAgents.push(agent);\n        self.agentToIndex[agent] = self.authorizedAgents.length - 1;\n        Authorized(agent, callingContext);\n    }\n\n    function revokeAuthorization(\n        Permissions storage self,\n        address agent,\n        string callingContext\n    )\n        internal\n    {\n        /* We only want to do work in the case where the agent whose\n        authorization is being revoked had authorization permissions in the\n        first place. */\n        require(isAuthorized(self, agent));\n\n        uint indexOfAgentToRevoke = self.agentToIndex[agent];\n        uint indexOfAgentToMove = self.authorizedAgents.length - 1;\n        address agentToMove = self.authorizedAgents[indexOfAgentToMove];\n\n        // Revoke the agent's authorization.\n        delete self.authorized[agent];\n\n        // Remove the agent from our collection of authorized agents.\n        self.authorizedAgents[indexOfAgentToRevoke] = agentToMove;\n\n        // Update our indices to reflect the above changes.\n        self.agentToIndex[agentToMove] = indexOfAgentToRevoke;\n        delete self.agentToIndex[agent];\n\n        // Clean up memory that's no longer being used.\n        delete self.authorizedAgents[indexOfAgentToMove];\n        self.authorizedAgents.length -= 1;\n\n        AuthorizationRevoked(agent, callingContext);\n    }\n\n    function isAuthorized(Permissions storage self, address agent)\n        internal\n        view\n        returns (bool)\n    {\n        return self.authorized[agent];\n    }\n\n    function isNotAuthorized(Permissions storage self, address agent)\n        internal\n        view\n        returns (bool)\n    {\n        return !isAuthorized(self, agent);\n    }\n\n    function getAuthorizedAgents(Permissions storage self)\n        internal\n        view\n        returns (address[])\n    {\n        return self.authorizedAgents;\n    }\n}\n",
  "sourcePath": "/Users/graemeboy/Dharma/charta/contracts/libraries/PermissionsLib.sol",
  "ast": {
    "attributes": {
      "absolutePath": "/Users/graemeboy/Dharma/charta/contracts/libraries/PermissionsLib.sol",
      "exportedSymbols": {
        "PermissionEvents": [
          5499
        ],
        "PermissionsLib": [
          5703
        ]
      }
    },
    "children": [
      {
        "attributes": {
          "literals": [
            "solidity",
            "0.4",
            ".18"
          ]
        },
        "id": 5486,
        "name": "PragmaDirective",
        "src": "584:23:16"
      },
      {
        "attributes": {
          "baseContracts": [
            null
          ],
          "contractDependencies": [
            null
          ],
          "contractKind": "contract",
          "documentation": " Note(kayvon): these events are emitted by our PermissionsLib, but all contracts that\n depend on the library must also define the events in order for web3 clients to pick them up.\n This topic is discussed in greater detail here (under the section \"Events and Libraries\"):\n https://blog.aragon.one/library-driven-development-in-solidity-2bebcaf88736",
          "fullyImplemented": true,
          "linearizedBaseContracts": [
            5499
          ],
          "name": "PermissionEvents",
          "scope": 5704
        },
        "children": [
          {
            "attributes": {
              "anonymous": false,
              "name": "Authorized"
            },
            "children": [
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "indexed": true,
                      "name": "agent",
                      "scope": 5492,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "address",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "address",
                          "type": "address"
                        },
                        "id": 5487,
                        "name": "ElementaryTypeName",
                        "src": "1028:7:16"
                      }
                    ],
                    "id": 5488,
                    "name": "VariableDeclaration",
                    "src": "1028:21:16"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "indexed": false,
                      "name": "callingContext",
                      "scope": 5492,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "string memory",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "string",
                          "type": "string storage pointer"
                        },
                        "id": 5489,
                        "name": "ElementaryTypeName",
                        "src": "1051:6:16"
                      }
                    ],
                    "id": 5490,
                    "name": "VariableDeclaration",
                    "src": "1051:21:16"
                  }
                ],
                "id": 5491,
                "name": "ParameterList",
                "src": "1027:46:16"
              }
            ],
            "id": 5492,
            "name": "EventDefinition",
            "src": "1011:63:16"
          },
          {
            "attributes": {
              "anonymous": false,
              "name": "AuthorizationRevoked"
            },
            "children": [
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "indexed": true,
                      "name": "agent",
                      "scope": 5498,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "address",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "address",
                          "type": "address"
                        },
                        "id": 5493,
                        "name": "ElementaryTypeName",
                        "src": "1106:7:16"
                      }
                    ],
                    "id": 5494,
                    "name": "VariableDeclaration",
                    "src": "1106:21:16"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "indexed": false,
                      "name": "callingContext",
                      "scope": 5498,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "string memory",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "string",
                          "type": "string storage pointer"
                        },
                        "id": 5495,
                        "name": "ElementaryTypeName",
                        "src": "1129:6:16"
                      }
                    ],
                    "id": 5496,
                    "name": "VariableDeclaration",
                    "src": "1129:21:16"
                  }
                ],
                "id": 5497,
                "name": "ParameterList",
                "src": "1105:46:16"
              }
            ],
            "id": 5498,
            "name": "EventDefinition",
            "src": "1079:73:16"
          }
        ],
        "id": 5499,
        "name": "ContractDefinition",
        "src": "979:175:16"
      },
      {
        "attributes": {
          "baseContracts": [
            null
          ],
          "contractDependencies": [
            null
          ],
          "contractKind": "library",
          "documentation": null,
          "fullyImplemented": true,
          "linearizedBaseContracts": [
            5703
          ],
          "name": "PermissionsLib",
          "scope": 5704
        },
        "children": [
          {
            "attributes": {
              "anonymous": false,
              "name": "Authorized"
            },
            "children": [
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "indexed": true,
                      "name": "agent",
                      "scope": 5505,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "address",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "address",
                          "type": "address"
                        },
                        "id": 5500,
                        "name": "ElementaryTypeName",
                        "src": "1416:7:16"
                      }
                    ],
                    "id": 5501,
                    "name": "VariableDeclaration",
                    "src": "1416:21:16"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "indexed": false,
                      "name": "callingContext",
                      "scope": 5505,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "string memory",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "string",
                          "type": "string storage pointer"
                        },
                        "id": 5502,
                        "name": "ElementaryTypeName",
                        "src": "1439:6:16"
                      }
                    ],
                    "id": 5503,
                    "name": "VariableDeclaration",
                    "src": "1439:21:16"
                  }
                ],
                "id": 5504,
                "name": "ParameterList",
                "src": "1415:46:16"
              }
            ],
            "id": 5505,
            "name": "EventDefinition",
            "src": "1399:63:16"
          },
          {
            "attributes": {
              "anonymous": false,
              "name": "AuthorizationRevoked"
            },
            "children": [
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "indexed": true,
                      "name": "agent",
                      "scope": 5511,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "address",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "address",
                          "type": "address"
                        },
                        "id": 5506,
                        "name": "ElementaryTypeName",
                        "src": "1494:7:16"
                      }
                    ],
                    "id": 5507,
                    "name": "VariableDeclaration",
                    "src": "1494:21:16"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "indexed": false,
                      "name": "callingContext",
                      "scope": 5511,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "string memory",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "string",
                          "type": "string storage pointer"
                        },
                        "id": 5508,
                        "name": "ElementaryTypeName",
                        "src": "1517:6:16"
                      }
                    ],
                    "id": 5509,
                    "name": "VariableDeclaration",
                    "src": "1517:21:16"
                  }
                ],
                "id": 5510,
                "name": "ParameterList",
                "src": "1493:46:16"
              }
            ],
            "id": 5511,
            "name": "EventDefinition",
            "src": "1467:73:16"
          },
          {
            "attributes": {
              "canonicalName": "PermissionsLib.Permissions",
              "name": "Permissions",
              "scope": 5703,
              "visibility": "public"
            },
            "children": [
              {
                "attributes": {
                  "constant": false,
                  "name": "authorized",
                  "scope": 5523,
                  "stateVariable": false,
                  "storageLocation": "default",
                  "type": "mapping(address => bool)",
                  "value": null,
                  "visibility": "internal"
                },
                "children": [
                  {
                    "attributes": {
                      "type": "mapping(address => bool)"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "address",
                          "type": "address"
                        },
                        "id": 5512,
                        "name": "ElementaryTypeName",
                        "src": "1584:7:16"
                      },
                      {
                        "attributes": {
                          "name": "bool",
                          "type": "bool"
                        },
                        "id": 5513,
                        "name": "ElementaryTypeName",
                        "src": "1595:4:16"
                      }
                    ],
                    "id": 5514,
                    "name": "Mapping",
                    "src": "1575:25:16"
                  }
                ],
                "id": 5515,
                "name": "VariableDeclaration",
                "src": "1575:36:16"
              },
              {
                "attributes": {
                  "constant": false,
                  "name": "agentToIndex",
                  "scope": 5523,
                  "stateVariable": false,
                  "storageLocation": "default",
                  "type": "mapping(address => uint256)",
                  "value": null,
                  "visibility": "internal"
                },
                "children": [
                  {
                    "attributes": {
                      "type": "mapping(address => uint256)"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "address",
                          "type": "address"
                        },
                        "id": 5516,
                        "name": "ElementaryTypeName",
                        "src": "1630:7:16"
                      },
                      {
                        "attributes": {
                          "name": "uint",
                          "type": "uint256"
                        },
                        "id": 5517,
                        "name": "ElementaryTypeName",
                        "src": "1641:4:16"
                      }
                    ],
                    "id": 5518,
                    "name": "Mapping",
                    "src": "1621:25:16"
                  }
                ],
                "id": 5519,
                "name": "VariableDeclaration",
                "src": "1621:38:16"
              },
              {
                "attributes": {
                  "constant": false,
                  "name": "authorizedAgents",
                  "scope": 5523,
                  "stateVariable": false,
                  "storageLocation": "default",
                  "type": "address[] storage pointer",
                  "value": null,
                  "visibility": "internal"
                },
                "children": [
                  {
                    "attributes": {
                      "length": null,
                      "type": "address[] storage pointer"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "address",
                          "type": "address"
                        },
                        "id": 5520,
                        "name": "ElementaryTypeName",
                        "src": "1693:7:16"
                      }
                    ],
                    "id": 5521,
                    "name": "ArrayTypeName",
                    "src": "1693:9:16"
                  }
                ],
                "id": 5522,
                "name": "VariableDeclaration",
                "src": "1693:26:16"
              }
            ],
            "id": 5523,
            "name": "StructDefinition",
            "src": "1546:180:16"
          },
          {
            "attributes": {
              "constant": false,
              "implemented": true,
              "isConstructor": false,
              "modifiers": [
                null
              ],
              "name": "authorize",
              "payable": false,
              "scope": 5703,
              "stateMutability": "nonpayable",
              "superFunction": null,
              "visibility": "internal"
            },
            "children": [
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "name": "self",
                      "scope": 5573,
                      "stateVariable": false,
                      "storageLocation": "storage",
                      "type": "struct PermissionsLib.Permissions storage pointer",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "contractScope": null,
                          "name": "Permissions",
                          "referencedDeclaration": 5523,
                          "type": "struct PermissionsLib.Permissions storage pointer"
                        },
                        "id": 5524,
                        "name": "UserDefinedTypeName",
                        "src": "1760:11:16"
                      }
                    ],
                    "id": 5525,
                    "name": "VariableDeclaration",
                    "src": "1760:24:16"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "name": "agent",
                      "scope": 5573,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "address",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "address",
                          "type": "address"
                        },
                        "id": 5526,
                        "name": "ElementaryTypeName",
                        "src": "1794:7:16"
                      }
                    ],
                    "id": 5527,
                    "name": "VariableDeclaration",
                    "src": "1794:13:16"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "name": "callingContext",
                      "scope": 5573,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "string memory",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "string",
                          "type": "string storage pointer"
                        },
                        "id": 5528,
                        "name": "ElementaryTypeName",
                        "src": "1817:6:16"
                      }
                    ],
                    "id": 5529,
                    "name": "VariableDeclaration",
                    "src": "1817:21:16"
                  }
                ],
                "id": 5530,
                "name": "ParameterList",
                "src": "1750:94:16"
              },
              {
                "attributes": {
                  "parameters": [
                    null
                  ]
                },
                "children": [],
                "id": 5531,
                "name": "ParameterList",
                "src": "1866:0:16"
              },
              {
                "children": [
                  {
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "isStructConstructorCall": false,
                          "lValueRequested": false,
                          "names": [
                            null
                          ],
                          "type": "tuple()",
                          "type_conversion": false
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": [
                                {
                                  "typeIdentifier": "t_bool",
                                  "typeString": "bool"
                                }
                              ],
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 15087,
                              "type": "function (bool) pure",
                              "value": "require"
                            },
                            "id": 5532,
                            "name": "Identifier",
                            "src": "1876:7:16"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "isStructConstructorCall": false,
                              "lValueRequested": false,
                              "names": [
                                null
                              ],
                              "type": "bool",
                              "type_conversion": false
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": [
                                    {
                                      "typeIdentifier": "t_struct$_Permissions_$5523_storage_ptr",
                                      "typeString": "struct PermissionsLib.Permissions storage pointer"
                                    },
                                    {
                                      "typeIdentifier": "t_address",
                                      "typeString": "address"
                                    }
                                  ],
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 5690,
                                  "type": "function (struct PermissionsLib.Permissions storage pointer,address) view returns (bool)",
                                  "value": "isNotAuthorized"
                                },
                                "id": 5533,
                                "name": "Identifier",
                                "src": "1884:15:16"
                              },
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 5525,
                                  "type": "struct PermissionsLib.Permissions storage pointer",
                                  "value": "self"
                                },
                                "id": 5534,
                                "name": "Identifier",
                                "src": "1900:4:16"
                              },
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 5527,
                                  "type": "address",
                                  "value": "agent"
                                },
                                "id": 5535,
                                "name": "Identifier",
                                "src": "1906:5:16"
                              }
                            ],
                            "id": 5536,
                            "name": "FunctionCall",
                            "src": "1884:28:16"
                          }
                        ],
                        "id": 5537,
                        "name": "FunctionCall",
                        "src": "1876:37:16"
                      }
                    ],
                    "id": 5538,
                    "name": "ExpressionStatement",
                    "src": "1876:37:16"
                  },
                  {
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "operator": "=",
                          "type": "bool"
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": true,
                              "type": "bool"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "member_name": "authorized",
                                  "referencedDeclaration": 5515,
                                  "type": "mapping(address => bool)"
                                },
                                "children": [
                                  {
                                    "attributes": {
                                      "argumentTypes": null,
                                      "overloadedDeclarations": [
                                        null
                                      ],
                                      "referencedDeclaration": 5525,
                                      "type": "struct PermissionsLib.Permissions storage pointer",
                                      "value": "self"
                                    },
                                    "id": 5539,
                                    "name": "Identifier",
                                    "src": "1924:4:16"
                                  }
                                ],
                                "id": 5542,
                                "name": "MemberAccess",
                                "src": "1924:15:16"
                              },
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 5527,
                                  "type": "address",
                                  "value": "agent"
                                },
                                "id": 5541,
                                "name": "Identifier",
                                "src": "1940:5:16"
                              }
                            ],
                            "id": 5543,
                            "name": "IndexAccess",
                            "src": "1924:22:16"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "hexvalue": "74727565",
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "lValueRequested": false,
                              "subdenomination": null,
                              "token": "bool",
                              "type": "bool",
                              "value": "true"
                            },
                            "id": 5544,
                            "name": "Literal",
                            "src": "1949:4:16"
                          }
                        ],
                        "id": 5545,
                        "name": "Assignment",
                        "src": "1924:29:16"
                      }
                    ],
                    "id": 5546,
                    "name": "ExpressionStatement",
                    "src": "1924:29:16"
                  },
                  {
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "isStructConstructorCall": false,
                          "lValueRequested": false,
                          "names": [
                            null
                          ],
                          "type": "uint256",
                          "type_conversion": false
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": [
                                {
                                  "typeIdentifier": "t_address",
                                  "typeString": "address"
                                }
                              ],
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "member_name": "push",
                              "referencedDeclaration": null,
                              "type": "function (address) returns (uint256)"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "member_name": "authorizedAgents",
                                  "referencedDeclaration": 5522,
                                  "type": "address[] storage ref"
                                },
                                "children": [
                                  {
                                    "attributes": {
                                      "argumentTypes": null,
                                      "overloadedDeclarations": [
                                        null
                                      ],
                                      "referencedDeclaration": 5525,
                                      "type": "struct PermissionsLib.Permissions storage pointer",
                                      "value": "self"
                                    },
                                    "id": 5547,
                                    "name": "Identifier",
                                    "src": "1963:4:16"
                                  }
                                ],
                                "id": 5550,
                                "name": "MemberAccess",
                                "src": "1963:21:16"
                              }
                            ],
                            "id": 5551,
                            "name": "MemberAccess",
                            "src": "1963:26:16"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 5527,
                              "type": "address",
                              "value": "agent"
                            },
                            "id": 5552,
                            "name": "Identifier",
                            "src": "1990:5:16"
                          }
                        ],
                        "id": 5553,
                        "name": "FunctionCall",
                        "src": "1963:33:16"
                      }
                    ],
                    "id": 5554,
                    "name": "ExpressionStatement",
                    "src": "1963:33:16"
                  },
                  {
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "operator": "=",
                          "type": "uint256"
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": true,
                              "type": "uint256"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "member_name": "agentToIndex",
                                  "referencedDeclaration": 5519,
                                  "type": "mapping(address => uint256)"
                                },
                                "children": [
                                  {
                                    "attributes": {
                                      "argumentTypes": null,
                                      "overloadedDeclarations": [
                                        null
                                      ],
                                      "referencedDeclaration": 5525,
                                      "type": "struct PermissionsLib.Permissions storage pointer",
                                      "value": "self"
                                    },
                                    "id": 5555,
                                    "name": "Identifier",
                                    "src": "2006:4:16"
                                  }
                                ],
                                "id": 5558,
                                "name": "MemberAccess",
                                "src": "2006:17:16"
                              },
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 5527,
                                  "type": "address",
                                  "value": "agent"
                                },
                                "id": 5557,
                                "name": "Identifier",
                                "src": "2024:5:16"
                              }
                            ],
                            "id": 5559,
                            "name": "IndexAccess",
                            "src": "2006:24:16"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "commonType": {
                                "typeIdentifier": "t_uint256",
                                "typeString": "uint256"
                              },
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "operator": "-",
                              "type": "uint256"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "member_name": "length",
                                  "referencedDeclaration": null,
                                  "type": "uint256"
                                },
                                "children": [
                                  {
                                    "attributes": {
                                      "argumentTypes": null,
                                      "isConstant": false,
                                      "isLValue": true,
                                      "isPure": false,
                                      "lValueRequested": false,
                                      "member_name": "authorizedAgents",
                                      "referencedDeclaration": 5522,
                                      "type": "address[] storage ref"
                                    },
                                    "children": [
                                      {
                                        "attributes": {
                                          "argumentTypes": null,
                                          "overloadedDeclarations": [
                                            null
                                          ],
                                          "referencedDeclaration": 5525,
                                          "type": "struct PermissionsLib.Permissions storage pointer",
                                          "value": "self"
                                        },
                                        "id": 5560,
                                        "name": "Identifier",
                                        "src": "2033:4:16"
                                      }
                                    ],
                                    "id": 5561,
                                    "name": "MemberAccess",
                                    "src": "2033:21:16"
                                  }
                                ],
                                "id": 5562,
                                "name": "MemberAccess",
                                "src": "2033:28:16"
                              },
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "hexvalue": "31",
                                  "isConstant": false,
                                  "isLValue": false,
                                  "isPure": true,
                                  "lValueRequested": false,
                                  "subdenomination": null,
                                  "token": "number",
                                  "type": "int_const 1",
                                  "value": "1"
                                },
                                "id": 5563,
                                "name": "Literal",
                                "src": "2064:1:16"
                              }
                            ],
                            "id": 5564,
                            "name": "BinaryOperation",
                            "src": "2033:32:16"
                          }
                        ],
                        "id": 5565,
                        "name": "Assignment",
                        "src": "2006:59:16"
                      }
                    ],
                    "id": 5566,
                    "name": "ExpressionStatement",
                    "src": "2006:59:16"
                  },
                  {
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "isStructConstructorCall": false,
                          "lValueRequested": false,
                          "names": [
                            null
                          ],
                          "type": "tuple()",
                          "type_conversion": false
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": [
                                {
                                  "typeIdentifier": "t_address",
                                  "typeString": "address"
                                },
                                {
                                  "typeIdentifier": "t_string_memory_ptr",
                                  "typeString": "string memory"
                                }
                              ],
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 5505,
                              "type": "function (address,string memory)",
                              "value": "Authorized"
                            },
                            "id": 5567,
                            "name": "Identifier",
                            "src": "2075:10:16"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 5527,
                              "type": "address",
                              "value": "agent"
                            },
                            "id": 5568,
                            "name": "Identifier",
                            "src": "2086:5:16"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 5529,
                              "type": "string memory",
                              "value": "callingContext"
                            },
                            "id": 5569,
                            "name": "Identifier",
                            "src": "2093:14:16"
                          }
                        ],
                        "id": 5570,
                        "name": "FunctionCall",
                        "src": "2075:33:16"
                      }
                    ],
                    "id": 5571,
                    "name": "ExpressionStatement",
                    "src": "2075:33:16"
                  }
                ],
                "id": 5572,
                "name": "Block",
                "src": "1866:249:16"
              }
            ],
            "id": 5573,
            "name": "FunctionDefinition",
            "src": "1732:383:16"
          },
          {
            "attributes": {
              "constant": false,
              "implemented": true,
              "isConstructor": false,
              "modifiers": [
                null
              ],
              "name": "revokeAuthorization",
              "payable": false,
              "scope": 5703,
              "stateMutability": "nonpayable",
              "superFunction": null,
              "visibility": "internal"
            },
            "children": [
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "name": "self",
                      "scope": 5659,
                      "stateVariable": false,
                      "storageLocation": "storage",
                      "type": "struct PermissionsLib.Permissions storage pointer",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "contractScope": null,
                          "name": "Permissions",
                          "referencedDeclaration": 5523,
                          "type": "struct PermissionsLib.Permissions storage pointer"
                        },
                        "id": 5574,
                        "name": "UserDefinedTypeName",
                        "src": "2159:11:16"
                      }
                    ],
                    "id": 5575,
                    "name": "VariableDeclaration",
                    "src": "2159:24:16"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "name": "agent",
                      "scope": 5659,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "address",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "address",
                          "type": "address"
                        },
                        "id": 5576,
                        "name": "ElementaryTypeName",
                        "src": "2193:7:16"
                      }
                    ],
                    "id": 5577,
                    "name": "VariableDeclaration",
                    "src": "2193:13:16"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "name": "callingContext",
                      "scope": 5659,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "string memory",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "string",
                          "type": "string storage pointer"
                        },
                        "id": 5578,
                        "name": "ElementaryTypeName",
                        "src": "2216:6:16"
                      }
                    ],
                    "id": 5579,
                    "name": "VariableDeclaration",
                    "src": "2216:21:16"
                  }
                ],
                "id": 5580,
                "name": "ParameterList",
                "src": "2149:94:16"
              },
              {
                "attributes": {
                  "parameters": [
                    null
                  ]
                },
                "children": [],
                "id": 5581,
                "name": "ParameterList",
                "src": "2265:0:16"
              },
              {
                "children": [
                  {
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "isStructConstructorCall": false,
                          "lValueRequested": false,
                          "names": [
                            null
                          ],
                          "type": "tuple()",
                          "type_conversion": false
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": [
                                {
                                  "typeIdentifier": "t_bool",
                                  "typeString": "bool"
                                }
                              ],
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 15087,
                              "type": "function (bool) pure",
                              "value": "require"
                            },
                            "id": 5582,
                            "name": "Identifier",
                            "src": "2444:7:16"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "isStructConstructorCall": false,
                              "lValueRequested": false,
                              "names": [
                                null
                              ],
                              "type": "bool",
                              "type_conversion": false
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": [
                                    {
                                      "typeIdentifier": "t_struct$_Permissions_$5523_storage_ptr",
                                      "typeString": "struct PermissionsLib.Permissions storage pointer"
                                    },
                                    {
                                      "typeIdentifier": "t_address",
                                      "typeString": "address"
                                    }
                                  ],
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 5674,
                                  "type": "function (struct PermissionsLib.Permissions storage pointer,address) view returns (bool)",
                                  "value": "isAuthorized"
                                },
                                "id": 5583,
                                "name": "Identifier",
                                "src": "2452:12:16"
                              },
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 5575,
                                  "type": "struct PermissionsLib.Permissions storage pointer",
                                  "value": "self"
                                },
                                "id": 5584,
                                "name": "Identifier",
                                "src": "2465:4:16"
                              },
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 5577,
                                  "type": "address",
                                  "value": "agent"
                                },
                                "id": 5585,
                                "name": "Identifier",
                                "src": "2471:5:16"
                              }
                            ],
                            "id": 5586,
                            "name": "FunctionCall",
                            "src": "2452:25:16"
                          }
                        ],
                        "id": 5587,
                        "name": "FunctionCall",
                        "src": "2444:34:16"
                      }
                    ],
                    "id": 5588,
                    "name": "ExpressionStatement",
                    "src": "2444:34:16"
                  },
                  {
                    "attributes": {
                      "assignments": [
                        5590
                      ]
                    },
                    "children": [
                      {
                        "attributes": {
                          "constant": false,
                          "name": "indexOfAgentToRevoke",
                          "scope": 5659,
                          "stateVariable": false,
                          "storageLocation": "default",
                          "type": "uint256",
                          "value": null,
                          "visibility": "internal"
                        },
                        "children": [
                          {
                            "attributes": {
                              "name": "uint",
                              "type": "uint256"
                            },
                            "id": 5589,
                            "name": "ElementaryTypeName",
                            "src": "2489:4:16"
                          }
                        ],
                        "id": 5590,
                        "name": "VariableDeclaration",
                        "src": "2489:25:16"
                      },
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "type": "uint256"
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": false,
                              "member_name": "agentToIndex",
                              "referencedDeclaration": 5519,
                              "type": "mapping(address => uint256)"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 5575,
                                  "type": "struct PermissionsLib.Permissions storage pointer",
                                  "value": "self"
                                },
                                "id": 5591,
                                "name": "Identifier",
                                "src": "2517:4:16"
                              }
                            ],
                            "id": 5592,
                            "name": "MemberAccess",
                            "src": "2517:17:16"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 5577,
                              "type": "address",
                              "value": "agent"
                            },
                            "id": 5593,
                            "name": "Identifier",
                            "src": "2535:5:16"
                          }
                        ],
                        "id": 5594,
                        "name": "IndexAccess",
                        "src": "2517:24:16"
                      }
                    ],
                    "id": 5595,
                    "name": "VariableDeclarationStatement",
                    "src": "2489:52:16"
                  },
                  {
                    "attributes": {
                      "assignments": [
                        5597
                      ]
                    },
                    "children": [
                      {
                        "attributes": {
                          "constant": false,
                          "name": "indexOfAgentToMove",
                          "scope": 5659,
                          "stateVariable": false,
                          "storageLocation": "default",
                          "type": "uint256",
                          "value": null,
                          "visibility": "internal"
                        },
                        "children": [
                          {
                            "attributes": {
                              "name": "uint",
                              "type": "uint256"
                            },
                            "id": 5596,
                            "name": "ElementaryTypeName",
                            "src": "2551:4:16"
                          }
                        ],
                        "id": 5597,
                        "name": "VariableDeclaration",
                        "src": "2551:23:16"
                      },
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "commonType": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          },
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "operator": "-",
                          "type": "uint256"
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": false,
                              "member_name": "length",
                              "referencedDeclaration": null,
                              "type": "uint256"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "member_name": "authorizedAgents",
                                  "referencedDeclaration": 5522,
                                  "type": "address[] storage ref"
                                },
                                "children": [
                                  {
                                    "attributes": {
                                      "argumentTypes": null,
                                      "overloadedDeclarations": [
                                        null
                                      ],
                                      "referencedDeclaration": 5575,
                                      "type": "struct PermissionsLib.Permissions storage pointer",
                                      "value": "self"
                                    },
                                    "id": 5598,
                                    "name": "Identifier",
                                    "src": "2577:4:16"
                                  }
                                ],
                                "id": 5599,
                                "name": "MemberAccess",
                                "src": "2577:21:16"
                              }
                            ],
                            "id": 5600,
                            "name": "MemberAccess",
                            "src": "2577:28:16"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "hexvalue": "31",
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "lValueRequested": false,
                              "subdenomination": null,
                              "token": "number",
                              "type": "int_const 1",
                              "value": "1"
                            },
                            "id": 5601,
                            "name": "Literal",
                            "src": "2608:1:16"
                          }
                        ],
                        "id": 5602,
                        "name": "BinaryOperation",
                        "src": "2577:32:16"
                      }
                    ],
                    "id": 5603,
                    "name": "VariableDeclarationStatement",
                    "src": "2551:58:16"
                  },
                  {
                    "attributes": {
                      "assignments": [
                        5605
                      ]
                    },
                    "children": [
                      {
                        "attributes": {
                          "constant": false,
                          "name": "agentToMove",
                          "scope": 5659,
                          "stateVariable": false,
                          "storageLocation": "default",
                          "type": "address",
                          "value": null,
                          "visibility": "internal"
                        },
                        "children": [
                          {
                            "attributes": {
                              "name": "address",
                              "type": "address"
                            },
                            "id": 5604,
                            "name": "ElementaryTypeName",
                            "src": "2619:7:16"
                          }
                        ],
                        "id": 5605,
                        "name": "VariableDeclaration",
                        "src": "2619:19:16"
                      },
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "type": "address"
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": false,
                              "member_name": "authorizedAgents",
                              "referencedDeclaration": 5522,
                              "type": "address[] storage ref"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 5575,
                                  "type": "struct PermissionsLib.Permissions storage pointer",
                                  "value": "self"
                                },
                                "id": 5606,
                                "name": "Identifier",
                                "src": "2641:4:16"
                              }
                            ],
                            "id": 5607,
                            "name": "MemberAccess",
                            "src": "2641:21:16"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 5597,
                              "type": "uint256",
                              "value": "indexOfAgentToMove"
                            },
                            "id": 5608,
                            "name": "Identifier",
                            "src": "2663:18:16"
                          }
                        ],
                        "id": 5609,
                        "name": "IndexAccess",
                        "src": "2641:41:16"
                      }
                    ],
                    "id": 5610,
                    "name": "VariableDeclarationStatement",
                    "src": "2619:63:16"
                  },
                  {
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "operator": "delete",
                          "prefix": true,
                          "type": "tuple()"
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": true,
                              "type": "bool"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "member_name": "authorized",
                                  "referencedDeclaration": 5515,
                                  "type": "mapping(address => bool)"
                                },
                                "children": [
                                  {
                                    "attributes": {
                                      "argumentTypes": null,
                                      "overloadedDeclarations": [
                                        null
                                      ],
                                      "referencedDeclaration": 5575,
                                      "type": "struct PermissionsLib.Permissions storage pointer",
                                      "value": "self"
                                    },
                                    "id": 5611,
                                    "name": "Identifier",
                                    "src": "2745:4:16"
                                  }
                                ],
                                "id": 5612,
                                "name": "MemberAccess",
                                "src": "2745:15:16"
                              },
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 5577,
                                  "type": "address",
                                  "value": "agent"
                                },
                                "id": 5613,
                                "name": "Identifier",
                                "src": "2761:5:16"
                              }
                            ],
                            "id": 5614,
                            "name": "IndexAccess",
                            "src": "2745:22:16"
                          }
                        ],
                        "id": 5615,
                        "name": "UnaryOperation",
                        "src": "2738:29:16"
                      }
                    ],
                    "id": 5616,
                    "name": "ExpressionStatement",
                    "src": "2738:29:16"
                  },
                  {
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "operator": "=",
                          "type": "address"
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": true,
                              "type": "address"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "member_name": "authorizedAgents",
                                  "referencedDeclaration": 5522,
                                  "type": "address[] storage ref"
                                },
                                "children": [
                                  {
                                    "attributes": {
                                      "argumentTypes": null,
                                      "overloadedDeclarations": [
                                        null
                                      ],
                                      "referencedDeclaration": 5575,
                                      "type": "struct PermissionsLib.Permissions storage pointer",
                                      "value": "self"
                                    },
                                    "id": 5617,
                                    "name": "Identifier",
                                    "src": "2848:4:16"
                                  }
                                ],
                                "id": 5620,
                                "name": "MemberAccess",
                                "src": "2848:21:16"
                              },
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 5590,
                                  "type": "uint256",
                                  "value": "indexOfAgentToRevoke"
                                },
                                "id": 5619,
                                "name": "Identifier",
                                "src": "2870:20:16"
                              }
                            ],
                            "id": 5621,
                            "name": "IndexAccess",
                            "src": "2848:43:16"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 5605,
                              "type": "address",
                              "value": "agentToMove"
                            },
                            "id": 5622,
                            "name": "Identifier",
                            "src": "2894:11:16"
                          }
                        ],
                        "id": 5623,
                        "name": "Assignment",
                        "src": "2848:57:16"
                      }
                    ],
                    "id": 5624,
                    "name": "ExpressionStatement",
                    "src": "2848:57:16"
                  },
                  {
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "operator": "=",
                          "type": "uint256"
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": true,
                              "type": "uint256"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "member_name": "agentToIndex",
                                  "referencedDeclaration": 5519,
                                  "type": "mapping(address => uint256)"
                                },
                                "children": [
                                  {
                                    "attributes": {
                                      "argumentTypes": null,
                                      "overloadedDeclarations": [
                                        null
                                      ],
                                      "referencedDeclaration": 5575,
                                      "type": "struct PermissionsLib.Permissions storage pointer",
                                      "value": "self"
                                    },
                                    "id": 5625,
                                    "name": "Identifier",
                                    "src": "2976:4:16"
                                  }
                                ],
                                "id": 5628,
                                "name": "MemberAccess",
                                "src": "2976:17:16"
                              },
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 5605,
                                  "type": "address",
                                  "value": "agentToMove"
                                },
                                "id": 5627,
                                "name": "Identifier",
                                "src": "2994:11:16"
                              }
                            ],
                            "id": 5629,
                            "name": "IndexAccess",
                            "src": "2976:30:16"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 5590,
                              "type": "uint256",
                              "value": "indexOfAgentToRevoke"
                            },
                            "id": 5630,
                            "name": "Identifier",
                            "src": "3009:20:16"
                          }
                        ],
                        "id": 5631,
                        "name": "Assignment",
                        "src": "2976:53:16"
                      }
                    ],
                    "id": 5632,
                    "name": "ExpressionStatement",
                    "src": "2976:53:16"
                  },
                  {
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "operator": "delete",
                          "prefix": true,
                          "type": "tuple()"
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": true,
                              "type": "uint256"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "member_name": "agentToIndex",
                                  "referencedDeclaration": 5519,
                                  "type": "mapping(address => uint256)"
                                },
                                "children": [
                                  {
                                    "attributes": {
                                      "argumentTypes": null,
                                      "overloadedDeclarations": [
                                        null
                                      ],
                                      "referencedDeclaration": 5575,
                                      "type": "struct PermissionsLib.Permissions storage pointer",
                                      "value": "self"
                                    },
                                    "id": 5633,
                                    "name": "Identifier",
                                    "src": "3046:4:16"
                                  }
                                ],
                                "id": 5634,
                                "name": "MemberAccess",
                                "src": "3046:17:16"
                              },
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 5577,
                                  "type": "address",
                                  "value": "agent"
                                },
                                "id": 5635,
                                "name": "Identifier",
                                "src": "3064:5:16"
                              }
                            ],
                            "id": 5636,
                            "name": "IndexAccess",
                            "src": "3046:24:16"
                          }
                        ],
                        "id": 5637,
                        "name": "UnaryOperation",
                        "src": "3039:31:16"
                      }
                    ],
                    "id": 5638,
                    "name": "ExpressionStatement",
                    "src": "3039:31:16"
                  },
                  {
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "operator": "delete",
                          "prefix": true,
                          "type": "tuple()"
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": true,
                              "type": "address"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "member_name": "authorizedAgents",
                                  "referencedDeclaration": 5522,
                                  "type": "address[] storage ref"
                                },
                                "children": [
                                  {
                                    "attributes": {
                                      "argumentTypes": null,
                                      "overloadedDeclarations": [
                                        null
                                      ],
                                      "referencedDeclaration": 5575,
                                      "type": "struct PermissionsLib.Permissions storage pointer",
                                      "value": "self"
                                    },
                                    "id": 5639,
                                    "name": "Identifier",
                                    "src": "3144:4:16"
                                  }
                                ],
                                "id": 5640,
                                "name": "MemberAccess",
                                "src": "3144:21:16"
                              },
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 5597,
                                  "type": "uint256",
                                  "value": "indexOfAgentToMove"
                                },
                                "id": 5641,
                                "name": "Identifier",
                                "src": "3166:18:16"
                              }
                            ],
                            "id": 5642,
                            "name": "IndexAccess",
                            "src": "3144:41:16"
                          }
                        ],
                        "id": 5643,
                        "name": "UnaryOperation",
                        "src": "3137:48:16"
                      }
                    ],
                    "id": 5644,
                    "name": "ExpressionStatement",
                    "src": "3137:48:16"
                  },
                  {
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "operator": "-=",
                          "type": "uint256"
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": true,
                              "member_name": "length",
                              "referencedDeclaration": null,
                              "type": "uint256"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "member_name": "authorizedAgents",
                                  "referencedDeclaration": 5522,
                                  "type": "address[] storage ref"
                                },
                                "children": [
                                  {
                                    "attributes": {
                                      "argumentTypes": null,
                                      "overloadedDeclarations": [
                                        null
                                      ],
                                      "referencedDeclaration": 5575,
                                      "type": "struct PermissionsLib.Permissions storage pointer",
                                      "value": "self"
                                    },
                                    "id": 5645,
                                    "name": "Identifier",
                                    "src": "3195:4:16"
                                  }
                                ],
                                "id": 5648,
                                "name": "MemberAccess",
                                "src": "3195:21:16"
                              }
                            ],
                            "id": 5649,
                            "name": "MemberAccess",
                            "src": "3195:28:16"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "hexvalue": "31",
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "lValueRequested": false,
                              "subdenomination": null,
                              "token": "number",
                              "type": "int_const 1",
                              "value": "1"
                            },
                            "id": 5650,
                            "name": "Literal",
                            "src": "3227:1:16"
                          }
                        ],
                        "id": 5651,
                        "name": "Assignment",
                        "src": "3195:33:16"
                      }
                    ],
                    "id": 5652,
                    "name": "ExpressionStatement",
                    "src": "3195:33:16"
                  },
                  {
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "isStructConstructorCall": false,
                          "lValueRequested": false,
                          "names": [
                            null
                          ],
                          "type": "tuple()",
                          "type_conversion": false
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": [
                                {
                                  "typeIdentifier": "t_address",
                                  "typeString": "address"
                                },
                                {
                                  "typeIdentifier": "t_string_memory_ptr",
                                  "typeString": "string memory"
                                }
                              ],
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 5511,
                              "type": "function (address,string memory)",
                              "value": "AuthorizationRevoked"
                            },
                            "id": 5653,
                            "name": "Identifier",
                            "src": "3239:20:16"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 5577,
                              "type": "address",
                              "value": "agent"
                            },
                            "id": 5654,
                            "name": "Identifier",
                            "src": "3260:5:16"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 5579,
                              "type": "string memory",
                              "value": "callingContext"
                            },
                            "id": 5655,
                            "name": "Identifier",
                            "src": "3267:14:16"
                          }
                        ],
                        "id": 5656,
                        "name": "FunctionCall",
                        "src": "3239:43:16"
                      }
                    ],
                    "id": 5657,
                    "name": "ExpressionStatement",
                    "src": "3239:43:16"
                  }
                ],
                "id": 5658,
                "name": "Block",
                "src": "2265:1024:16"
              }
            ],
            "id": 5659,
            "name": "FunctionDefinition",
            "src": "2121:1168:16"
          },
          {
            "attributes": {
              "constant": true,
              "implemented": true,
              "isConstructor": false,
              "modifiers": [
                null
              ],
              "name": "isAuthorized",
              "payable": false,
              "scope": 5703,
              "stateMutability": "view",
              "superFunction": null,
              "visibility": "internal"
            },
            "children": [
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "name": "self",
                      "scope": 5674,
                      "stateVariable": false,
                      "storageLocation": "storage",
                      "type": "struct PermissionsLib.Permissions storage pointer",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "contractScope": null,
                          "name": "Permissions",
                          "referencedDeclaration": 5523,
                          "type": "struct PermissionsLib.Permissions storage pointer"
                        },
                        "id": 5660,
                        "name": "UserDefinedTypeName",
                        "src": "3317:11:16"
                      }
                    ],
                    "id": 5661,
                    "name": "VariableDeclaration",
                    "src": "3317:24:16"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "name": "agent",
                      "scope": 5674,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "address",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "address",
                          "type": "address"
                        },
                        "id": 5662,
                        "name": "ElementaryTypeName",
                        "src": "3343:7:16"
                      }
                    ],
                    "id": 5663,
                    "name": "VariableDeclaration",
                    "src": "3343:13:16"
                  }
                ],
                "id": 5664,
                "name": "ParameterList",
                "src": "3316:41:16"
              },
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "name": "",
                      "scope": 5674,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "bool",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "bool",
                          "type": "bool"
                        },
                        "id": 5665,
                        "name": "ElementaryTypeName",
                        "src": "3405:4:16"
                      }
                    ],
                    "id": 5666,
                    "name": "VariableDeclaration",
                    "src": "3405:4:16"
                  }
                ],
                "id": 5667,
                "name": "ParameterList",
                "src": "3404:6:16"
              },
              {
                "children": [
                  {
                    "attributes": {
                      "functionReturnParameters": 5667
                    },
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "type": "bool"
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": false,
                              "member_name": "authorized",
                              "referencedDeclaration": 5515,
                              "type": "mapping(address => bool)"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 5661,
                                  "type": "struct PermissionsLib.Permissions storage pointer",
                                  "value": "self"
                                },
                                "id": 5668,
                                "name": "Identifier",
                                "src": "3432:4:16"
                              }
                            ],
                            "id": 5669,
                            "name": "MemberAccess",
                            "src": "3432:15:16"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 5663,
                              "type": "address",
                              "value": "agent"
                            },
                            "id": 5670,
                            "name": "Identifier",
                            "src": "3448:5:16"
                          }
                        ],
                        "id": 5671,
                        "name": "IndexAccess",
                        "src": "3432:22:16"
                      }
                    ],
                    "id": 5672,
                    "name": "Return",
                    "src": "3425:29:16"
                  }
                ],
                "id": 5673,
                "name": "Block",
                "src": "3415:46:16"
              }
            ],
            "id": 5674,
            "name": "FunctionDefinition",
            "src": "3295:166:16"
          },
          {
            "attributes": {
              "constant": true,
              "implemented": true,
              "isConstructor": false,
              "modifiers": [
                null
              ],
              "name": "isNotAuthorized",
              "payable": false,
              "scope": 5703,
              "stateMutability": "view",
              "superFunction": null,
              "visibility": "internal"
            },
            "children": [
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "name": "self",
                      "scope": 5690,
                      "stateVariable": false,
                      "storageLocation": "storage",
                      "type": "struct PermissionsLib.Permissions storage pointer",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "contractScope": null,
                          "name": "Permissions",
                          "referencedDeclaration": 5523,
                          "type": "struct PermissionsLib.Permissions storage pointer"
                        },
                        "id": 5675,
                        "name": "UserDefinedTypeName",
                        "src": "3492:11:16"
                      }
                    ],
                    "id": 5676,
                    "name": "VariableDeclaration",
                    "src": "3492:24:16"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "name": "agent",
                      "scope": 5690,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "address",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "address",
                          "type": "address"
                        },
                        "id": 5677,
                        "name": "ElementaryTypeName",
                        "src": "3518:7:16"
                      }
                    ],
                    "id": 5678,
                    "name": "VariableDeclaration",
                    "src": "3518:13:16"
                  }
                ],
                "id": 5679,
                "name": "ParameterList",
                "src": "3491:41:16"
              },
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "name": "",
                      "scope": 5690,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "bool",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "bool",
                          "type": "bool"
                        },
                        "id": 5680,
                        "name": "ElementaryTypeName",
                        "src": "3580:4:16"
                      }
                    ],
                    "id": 5681,
                    "name": "VariableDeclaration",
                    "src": "3580:4:16"
                  }
                ],
                "id": 5682,
                "name": "ParameterList",
                "src": "3579:6:16"
              },
              {
                "children": [
                  {
                    "attributes": {
                      "functionReturnParameters": 5682
                    },
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "operator": "!",
                          "prefix": true,
                          "type": "bool"
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "isStructConstructorCall": false,
                              "lValueRequested": false,
                              "names": [
                                null
                              ],
                              "type": "bool",
                              "type_conversion": false
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": [
                                    {
                                      "typeIdentifier": "t_struct$_Permissions_$5523_storage_ptr",
                                      "typeString": "struct PermissionsLib.Permissions storage pointer"
                                    },
                                    {
                                      "typeIdentifier": "t_address",
                                      "typeString": "address"
                                    }
                                  ],
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 5674,
                                  "type": "function (struct PermissionsLib.Permissions storage pointer,address) view returns (bool)",
                                  "value": "isAuthorized"
                                },
                                "id": 5683,
                                "name": "Identifier",
                                "src": "3608:12:16"
                              },
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 5676,
                                  "type": "struct PermissionsLib.Permissions storage pointer",
                                  "value": "self"
                                },
                                "id": 5684,
                                "name": "Identifier",
                                "src": "3621:4:16"
                              },
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 5678,
                                  "type": "address",
                                  "value": "agent"
                                },
                                "id": 5685,
                                "name": "Identifier",
                                "src": "3627:5:16"
                              }
                            ],
                            "id": 5686,
                            "name": "FunctionCall",
                            "src": "3608:25:16"
                          }
                        ],
                        "id": 5687,
                        "name": "UnaryOperation",
                        "src": "3607:26:16"
                      }
                    ],
                    "id": 5688,
                    "name": "Return",
                    "src": "3600:33:16"
                  }
                ],
                "id": 5689,
                "name": "Block",
                "src": "3590:50:16"
              }
            ],
            "id": 5690,
            "name": "FunctionDefinition",
            "src": "3467:173:16"
          },
          {
            "attributes": {
              "constant": true,
              "implemented": true,
              "isConstructor": false,
              "modifiers": [
                null
              ],
              "name": "getAuthorizedAgents",
              "payable": false,
              "scope": 5703,
              "stateMutability": "view",
              "superFunction": null,
              "visibility": "internal"
            },
            "children": [
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "name": "self",
                      "scope": 5702,
                      "stateVariable": false,
                      "storageLocation": "storage",
                      "type": "struct PermissionsLib.Permissions storage pointer",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "contractScope": null,
                          "name": "Permissions",
                          "referencedDeclaration": 5523,
                          "type": "struct PermissionsLib.Permissions storage pointer"
                        },
                        "id": 5691,
                        "name": "UserDefinedTypeName",
                        "src": "3675:11:16"
                      }
                    ],
                    "id": 5692,
                    "name": "VariableDeclaration",
                    "src": "3675:24:16"
                  }
                ],
                "id": 5693,
                "name": "ParameterList",
                "src": "3674:26:16"
              },
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "name": "",
                      "scope": 5702,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "address[] memory",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "length": null,
                          "type": "address[] storage pointer"
                        },
                        "children": [
                          {
                            "attributes": {
                              "name": "address",
                              "type": "address"
                            },
                            "id": 5694,
                            "name": "ElementaryTypeName",
                            "src": "3748:7:16"
                          }
                        ],
                        "id": 5695,
                        "name": "ArrayTypeName",
                        "src": "3748:9:16"
                      }
                    ],
                    "id": 5696,
                    "name": "VariableDeclaration",
                    "src": "3748:9:16"
                  }
                ],
                "id": 5697,
                "name": "ParameterList",
                "src": "3747:11:16"
              },
              {
                "children": [
                  {
                    "attributes": {
                      "functionReturnParameters": 5697
                    },
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "member_name": "authorizedAgents",
                          "referencedDeclaration": 5522,
                          "type": "address[] storage ref"
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 5692,
                              "type": "struct PermissionsLib.Permissions storage pointer",
                              "value": "self"
                            },
                            "id": 5698,
                            "name": "Identifier",
                            "src": "3780:4:16"
                          }
                        ],
                        "id": 5699,
                        "name": "MemberAccess",
                        "src": "3780:21:16"
                      }
                    ],
                    "id": 5700,
                    "name": "Return",
                    "src": "3773:28:16"
                  }
                ],
                "id": 5701,
                "name": "Block",
                "src": "3763:45:16"
              }
            ],
            "id": 5702,
            "name": "FunctionDefinition",
            "src": "3646:162:16"
          }
        ],
        "id": 5703,
        "name": "ContractDefinition",
        "src": "1157:2653:16"
      }
    ],
    "id": 5704,
    "name": "SourceUnit",
    "src": "584:3227:16"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.18+commit.9cf6e910.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "1.0.1",
  "updatedAt": "2018-09-07T18:09:37.293Z"
}