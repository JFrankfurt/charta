export const MockContract = 
{
  "contractName": "MockContract",
  "abi": [
    {
      "constant": true,
      "inputs": [
        {
          "name": "functionName",
          "type": "string"
        },
        {
          "name": "argsSignature",
          "type": "bytes32"
        }
      ],
      "name": "getMockReturnValue",
      "outputs": [
        {
          "name": "_mockReturnValue",
          "type": "bytes32"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "functionName",
          "type": "string"
        },
        {
          "name": "argsSignature",
          "type": "bytes32"
        },
        {
          "name": "returnValue",
          "type": "bytes32"
        }
      ],
      "name": "mockReturnValue",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "reset",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],
  "bytecode": "0x",
  "deployedBytecode": "0x",
  "sourceMap": "",
  "deployedSourceMap": "",
  "source": "/*\n\n  Copyright 2017 Dharma Labs Inc.\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n\n*/\n\npragma solidity 0.4.18;\n\n\ncontract MockContract {\n    bytes32 internal constant DEFAULT_SIGNATURE_ARGS = bytes32(0);\n\n    // We use bytes32 as our generic base type from and to which we cast all other types\n    mapping (string => bytes32[]) internal functionCallSignatures;\n    mapping (string => mapping (bytes32 => bytes32)) internal mockedReturnValue;\n    mapping (string => mapping (bytes32 => bool)) internal functionCalls;\n\n    function mockReturnValue(\n        string functionName,\n        bytes32 argsSignature,\n        bytes32 returnValue\n    ) public {\n        functionCallSignatures[functionName].push(argsSignature);\n        mockedReturnValue[functionName][argsSignature] = returnValue;\n    }\n\n    function getMockReturnValue(string functionName, bytes32 argsSignature)\n        public\n        view\n        returns (bytes32 _mockReturnValue)\n    {\n        return mockedReturnValue[functionName][argsSignature];\n    }\n\n    function reset() public {\n        for (uint i = 0; i < 10; i++) {\n            string memory functionName = getFunctionList()[i];\n\n            if (bytes(functionName).length != 0) {\n                for (uint j = 0; j < functionCallSignatures[functionName].length; j++) {\n                    bytes32 callSignature = functionCallSignatures[functionName][j];\n                    delete functionCalls[functionName][callSignature];\n                    delete mockedReturnValue[functionName][callSignature];\n                }\n\n                delete functionCallSignatures[functionName];\n            }\n        }\n    }\n\n    function functionCalledWithArgs(string functionName, bytes32 args)\n        internal\n    {\n        functionCalls[functionName][args] = true;\n        functionCallSignatures[functionName].push(args);\n    }\n\n    function wasFunctionCalledWithArgs(string functionName, bytes32 args)\n        internal\n        view\n        returns (bool wasCalled)\n    {\n        return functionCalls[functionName][args];\n    }\n\n    function getFunctionList() internal returns (string[10] functionNames);\n}\n",
  "sourcePath": "/Users/graemeboy/Dharma/charta/contracts/test/mocks/MockContract.sol",
  "ast": {
    "attributes": {
      "absolutePath": "/Users/graemeboy/Dharma/charta/contracts/test/mocks/MockContract.sol",
      "exportedSymbols": {
        "MockContract": [
          10124
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
        "id": 9941,
        "name": "PragmaDirective",
        "src": "584:23:22"
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
          "documentation": null,
          "fullyImplemented": false,
          "linearizedBaseContracts": [
            10124
          ],
          "name": "MockContract",
          "scope": 10125
        },
        "children": [
          {
            "attributes": {
              "constant": true,
              "name": "DEFAULT_SIGNATURE_ARGS",
              "scope": 10124,
              "stateVariable": true,
              "storageLocation": "default",
              "type": "bytes32",
              "visibility": "internal"
            },
            "children": [
              {
                "attributes": {
                  "name": "bytes32",
                  "type": "bytes32"
                },
                "id": 9942,
                "name": "ElementaryTypeName",
                "src": "638:7:22"
              },
              {
                "attributes": {
                  "argumentTypes": null,
                  "isConstant": false,
                  "isLValue": false,
                  "isPure": true,
                  "isStructConstructorCall": false,
                  "lValueRequested": false,
                  "names": [
                    null
                  ],
                  "type": "bytes32",
                  "type_conversion": true
                },
                "children": [
                  {
                    "attributes": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_rational_0_by_1",
                          "typeString": "int_const 0"
                        }
                      ],
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "lValueRequested": false,
                      "type": "type(bytes32)",
                      "value": "bytes32"
                    },
                    "id": 9943,
                    "name": "ElementaryTypeNameExpression",
                    "src": "689:7:22"
                  },
                  {
                    "attributes": {
                      "argumentTypes": null,
                      "hexvalue": "30",
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "lValueRequested": false,
                      "subdenomination": null,
                      "token": "number",
                      "type": "int_const 0",
                      "value": "0"
                    },
                    "id": 9944,
                    "name": "Literal",
                    "src": "697:1:22"
                  }
                ],
                "id": 9945,
                "name": "FunctionCall",
                "src": "689:10:22"
              }
            ],
            "id": 9946,
            "name": "VariableDeclaration",
            "src": "638:61:22"
          },
          {
            "attributes": {
              "constant": false,
              "name": "functionCallSignatures",
              "scope": 10124,
              "stateVariable": true,
              "storageLocation": "default",
              "type": "mapping(string memory => bytes32[] storage ref)",
              "value": null,
              "visibility": "internal"
            },
            "children": [
              {
                "attributes": {
                  "type": "mapping(string memory => bytes32[] storage ref)"
                },
                "children": [
                  {
                    "attributes": {
                      "name": "string",
                      "type": "string storage pointer"
                    },
                    "id": 9947,
                    "name": "ElementaryTypeName",
                    "src": "804:6:22"
                  },
                  {
                    "attributes": {
                      "length": null,
                      "type": "bytes32[] storage pointer"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "bytes32",
                          "type": "bytes32"
                        },
                        "id": 9948,
                        "name": "ElementaryTypeName",
                        "src": "814:7:22"
                      }
                    ],
                    "id": 9949,
                    "name": "ArrayTypeName",
                    "src": "814:9:22"
                  }
                ],
                "id": 9950,
                "name": "Mapping",
                "src": "795:29:22"
              }
            ],
            "id": 9951,
            "name": "VariableDeclaration",
            "src": "795:61:22"
          },
          {
            "attributes": {
              "constant": false,
              "name": "mockedReturnValue",
              "scope": 10124,
              "stateVariable": true,
              "storageLocation": "default",
              "type": "mapping(string memory => mapping(bytes32 => bytes32))",
              "value": null,
              "visibility": "internal"
            },
            "children": [
              {
                "attributes": {
                  "type": "mapping(string memory => mapping(bytes32 => bytes32))"
                },
                "children": [
                  {
                    "attributes": {
                      "name": "string",
                      "type": "string storage pointer"
                    },
                    "id": 9952,
                    "name": "ElementaryTypeName",
                    "src": "871:6:22"
                  },
                  {
                    "attributes": {
                      "type": "mapping(bytes32 => bytes32)"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "bytes32",
                          "type": "bytes32"
                        },
                        "id": 9953,
                        "name": "ElementaryTypeName",
                        "src": "890:7:22"
                      },
                      {
                        "attributes": {
                          "name": "bytes32",
                          "type": "bytes32"
                        },
                        "id": 9954,
                        "name": "ElementaryTypeName",
                        "src": "901:7:22"
                      }
                    ],
                    "id": 9955,
                    "name": "Mapping",
                    "src": "881:28:22"
                  }
                ],
                "id": 9956,
                "name": "Mapping",
                "src": "862:48:22"
              }
            ],
            "id": 9957,
            "name": "VariableDeclaration",
            "src": "862:75:22"
          },
          {
            "attributes": {
              "constant": false,
              "name": "functionCalls",
              "scope": 10124,
              "stateVariable": true,
              "storageLocation": "default",
              "type": "mapping(string memory => mapping(bytes32 => bool))",
              "value": null,
              "visibility": "internal"
            },
            "children": [
              {
                "attributes": {
                  "type": "mapping(string memory => mapping(bytes32 => bool))"
                },
                "children": [
                  {
                    "attributes": {
                      "name": "string",
                      "type": "string storage pointer"
                    },
                    "id": 9958,
                    "name": "ElementaryTypeName",
                    "src": "952:6:22"
                  },
                  {
                    "attributes": {
                      "type": "mapping(bytes32 => bool)"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "bytes32",
                          "type": "bytes32"
                        },
                        "id": 9959,
                        "name": "ElementaryTypeName",
                        "src": "971:7:22"
                      },
                      {
                        "attributes": {
                          "name": "bool",
                          "type": "bool"
                        },
                        "id": 9960,
                        "name": "ElementaryTypeName",
                        "src": "982:4:22"
                      }
                    ],
                    "id": 9961,
                    "name": "Mapping",
                    "src": "962:25:22"
                  }
                ],
                "id": 9962,
                "name": "Mapping",
                "src": "943:45:22"
              }
            ],
            "id": 9963,
            "name": "VariableDeclaration",
            "src": "943:68:22"
          },
          {
            "attributes": {
              "constant": false,
              "implemented": true,
              "isConstructor": false,
              "modifiers": [
                null
              ],
              "name": "mockReturnValue",
              "payable": false,
              "scope": 10124,
              "stateMutability": "nonpayable",
              "superFunction": null,
              "visibility": "public"
            },
            "children": [
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "name": "functionName",
                      "scope": 9988,
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
                        "id": 9964,
                        "name": "ElementaryTypeName",
                        "src": "1052:6:22"
                      }
                    ],
                    "id": 9965,
                    "name": "VariableDeclaration",
                    "src": "1052:19:22"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "name": "argsSignature",
                      "scope": 9988,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "bytes32",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "bytes32",
                          "type": "bytes32"
                        },
                        "id": 9966,
                        "name": "ElementaryTypeName",
                        "src": "1081:7:22"
                      }
                    ],
                    "id": 9967,
                    "name": "VariableDeclaration",
                    "src": "1081:21:22"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "name": "returnValue",
                      "scope": 9988,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "bytes32",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "bytes32",
                          "type": "bytes32"
                        },
                        "id": 9968,
                        "name": "ElementaryTypeName",
                        "src": "1112:7:22"
                      }
                    ],
                    "id": 9969,
                    "name": "VariableDeclaration",
                    "src": "1112:19:22"
                  }
                ],
                "id": 9970,
                "name": "ParameterList",
                "src": "1042:95:22"
              },
              {
                "attributes": {
                  "parameters": [
                    null
                  ]
                },
                "children": [],
                "id": 9971,
                "name": "ParameterList",
                "src": "1145:0:22"
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
                          "type": "uint256",
                          "type_conversion": false
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": [
                                {
                                  "typeIdentifier": "t_bytes32",
                                  "typeString": "bytes32"
                                }
                              ],
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "member_name": "push",
                              "referencedDeclaration": null,
                              "type": "function (bytes32) returns (uint256)"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "type": "bytes32[] storage ref"
                                },
                                "children": [
                                  {
                                    "attributes": {
                                      "argumentTypes": null,
                                      "overloadedDeclarations": [
                                        null
                                      ],
                                      "referencedDeclaration": 9951,
                                      "type": "mapping(string memory => bytes32[] storage ref)",
                                      "value": "functionCallSignatures"
                                    },
                                    "id": 9972,
                                    "name": "Identifier",
                                    "src": "1155:22:22"
                                  },
                                  {
                                    "attributes": {
                                      "argumentTypes": null,
                                      "overloadedDeclarations": [
                                        null
                                      ],
                                      "referencedDeclaration": 9965,
                                      "type": "string memory",
                                      "value": "functionName"
                                    },
                                    "id": 9973,
                                    "name": "Identifier",
                                    "src": "1178:12:22"
                                  }
                                ],
                                "id": 9974,
                                "name": "IndexAccess",
                                "src": "1155:36:22"
                              }
                            ],
                            "id": 9975,
                            "name": "MemberAccess",
                            "src": "1155:41:22"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 9967,
                              "type": "bytes32",
                              "value": "argsSignature"
                            },
                            "id": 9976,
                            "name": "Identifier",
                            "src": "1197:13:22"
                          }
                        ],
                        "id": 9977,
                        "name": "FunctionCall",
                        "src": "1155:56:22"
                      }
                    ],
                    "id": 9978,
                    "name": "ExpressionStatement",
                    "src": "1155:56:22"
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
                          "type": "bytes32"
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": true,
                              "type": "bytes32"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "type": "mapping(bytes32 => bytes32)"
                                },
                                "children": [
                                  {
                                    "attributes": {
                                      "argumentTypes": null,
                                      "overloadedDeclarations": [
                                        null
                                      ],
                                      "referencedDeclaration": 9957,
                                      "type": "mapping(string memory => mapping(bytes32 => bytes32))",
                                      "value": "mockedReturnValue"
                                    },
                                    "id": 9979,
                                    "name": "Identifier",
                                    "src": "1221:17:22"
                                  },
                                  {
                                    "attributes": {
                                      "argumentTypes": null,
                                      "overloadedDeclarations": [
                                        null
                                      ],
                                      "referencedDeclaration": 9965,
                                      "type": "string memory",
                                      "value": "functionName"
                                    },
                                    "id": 9980,
                                    "name": "Identifier",
                                    "src": "1239:12:22"
                                  }
                                ],
                                "id": 9982,
                                "name": "IndexAccess",
                                "src": "1221:31:22"
                              },
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 9967,
                                  "type": "bytes32",
                                  "value": "argsSignature"
                                },
                                "id": 9981,
                                "name": "Identifier",
                                "src": "1253:13:22"
                              }
                            ],
                            "id": 9983,
                            "name": "IndexAccess",
                            "src": "1221:46:22"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 9969,
                              "type": "bytes32",
                              "value": "returnValue"
                            },
                            "id": 9984,
                            "name": "Identifier",
                            "src": "1270:11:22"
                          }
                        ],
                        "id": 9985,
                        "name": "Assignment",
                        "src": "1221:60:22"
                      }
                    ],
                    "id": 9986,
                    "name": "ExpressionStatement",
                    "src": "1221:60:22"
                  }
                ],
                "id": 9987,
                "name": "Block",
                "src": "1145:143:22"
              }
            ],
            "id": 9988,
            "name": "FunctionDefinition",
            "src": "1018:270:22"
          },
          {
            "attributes": {
              "constant": true,
              "implemented": true,
              "isConstructor": false,
              "modifiers": [
                null
              ],
              "name": "getMockReturnValue",
              "payable": false,
              "scope": 10124,
              "stateMutability": "view",
              "superFunction": null,
              "visibility": "public"
            },
            "children": [
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "name": "functionName",
                      "scope": 10004,
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
                        "id": 9989,
                        "name": "ElementaryTypeName",
                        "src": "1322:6:22"
                      }
                    ],
                    "id": 9990,
                    "name": "VariableDeclaration",
                    "src": "1322:19:22"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "name": "argsSignature",
                      "scope": 10004,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "bytes32",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "bytes32",
                          "type": "bytes32"
                        },
                        "id": 9991,
                        "name": "ElementaryTypeName",
                        "src": "1343:7:22"
                      }
                    ],
                    "id": 9992,
                    "name": "VariableDeclaration",
                    "src": "1343:21:22"
                  }
                ],
                "id": 9993,
                "name": "ParameterList",
                "src": "1321:44:22"
              },
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "name": "_mockReturnValue",
                      "scope": 10004,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "bytes32",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "bytes32",
                          "type": "bytes32"
                        },
                        "id": 9994,
                        "name": "ElementaryTypeName",
                        "src": "1411:7:22"
                      }
                    ],
                    "id": 9995,
                    "name": "VariableDeclaration",
                    "src": "1411:24:22"
                  }
                ],
                "id": 9996,
                "name": "ParameterList",
                "src": "1410:26:22"
              },
              {
                "children": [
                  {
                    "attributes": {
                      "functionReturnParameters": 9996
                    },
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "type": "bytes32"
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "isConstant": false,
                              "isLValue": true,
                              "isPure": false,
                              "lValueRequested": false,
                              "type": "mapping(bytes32 => bytes32)"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 9957,
                                  "type": "mapping(string memory => mapping(bytes32 => bytes32))",
                                  "value": "mockedReturnValue"
                                },
                                "id": 9997,
                                "name": "Identifier",
                                "src": "1458:17:22"
                              },
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 9990,
                                  "type": "string memory",
                                  "value": "functionName"
                                },
                                "id": 9998,
                                "name": "Identifier",
                                "src": "1476:12:22"
                              }
                            ],
                            "id": 9999,
                            "name": "IndexAccess",
                            "src": "1458:31:22"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 9992,
                              "type": "bytes32",
                              "value": "argsSignature"
                            },
                            "id": 10000,
                            "name": "Identifier",
                            "src": "1490:13:22"
                          }
                        ],
                        "id": 10001,
                        "name": "IndexAccess",
                        "src": "1458:46:22"
                      }
                    ],
                    "id": 10002,
                    "name": "Return",
                    "src": "1451:53:22"
                  }
                ],
                "id": 10003,
                "name": "Block",
                "src": "1441:70:22"
              }
            ],
            "id": 10004,
            "name": "FunctionDefinition",
            "src": "1294:217:22"
          },
          {
            "attributes": {
              "constant": false,
              "implemented": true,
              "isConstructor": false,
              "modifiers": [
                null
              ],
              "name": "reset",
              "payable": false,
              "scope": 10124,
              "stateMutability": "nonpayable",
              "superFunction": null,
              "visibility": "public"
            },
            "children": [
              {
                "attributes": {
                  "parameters": [
                    null
                  ]
                },
                "children": [],
                "id": 10005,
                "name": "ParameterList",
                "src": "1531:2:22"
              },
              {
                "attributes": {
                  "parameters": [
                    null
                  ]
                },
                "children": [],
                "id": 10006,
                "name": "ParameterList",
                "src": "1541:0:22"
              },
              {
                "children": [
                  {
                    "children": [
                      {
                        "attributes": {
                          "assignments": [
                            10008
                          ]
                        },
                        "children": [
                          {
                            "attributes": {
                              "constant": false,
                              "name": "i",
                              "scope": 10077,
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
                                "id": 10007,
                                "name": "ElementaryTypeName",
                                "src": "1556:4:22"
                              }
                            ],
                            "id": 10008,
                            "name": "VariableDeclaration",
                            "src": "1556:6:22"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "hexvalue": "30",
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "lValueRequested": false,
                              "subdenomination": null,
                              "token": "number",
                              "type": "int_const 0",
                              "value": "0"
                            },
                            "id": 10009,
                            "name": "Literal",
                            "src": "1565:1:22"
                          }
                        ],
                        "id": 10010,
                        "name": "VariableDeclarationStatement",
                        "src": "1556:10:22"
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
                          "operator": "<",
                          "type": "bool"
                        },
                        "children": [
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 10008,
                              "type": "uint256",
                              "value": "i"
                            },
                            "id": 10011,
                            "name": "Identifier",
                            "src": "1568:1:22"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "hexvalue": "3130",
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": true,
                              "lValueRequested": false,
                              "subdenomination": null,
                              "token": "number",
                              "type": "int_const 10",
                              "value": "10"
                            },
                            "id": 10012,
                            "name": "Literal",
                            "src": "1572:2:22"
                          }
                        ],
                        "id": 10013,
                        "name": "BinaryOperation",
                        "src": "1568:6:22"
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
                              "operator": "++",
                              "prefix": false,
                              "type": "uint256"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 10008,
                                  "type": "uint256",
                                  "value": "i"
                                },
                                "id": 10014,
                                "name": "Identifier",
                                "src": "1576:1:22"
                              }
                            ],
                            "id": 10015,
                            "name": "UnaryOperation",
                            "src": "1576:3:22"
                          }
                        ],
                        "id": 10016,
                        "name": "ExpressionStatement",
                        "src": "1576:3:22"
                      },
                      {
                        "children": [
                          {
                            "attributes": {
                              "assignments": [
                                10018
                              ]
                            },
                            "children": [
                              {
                                "attributes": {
                                  "constant": false,
                                  "name": "functionName",
                                  "scope": 10077,
                                  "stateVariable": false,
                                  "storageLocation": "memory",
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
                                    "id": 10017,
                                    "name": "ElementaryTypeName",
                                    "src": "1595:6:22"
                                  }
                                ],
                                "id": 10018,
                                "name": "VariableDeclaration",
                                "src": "1595:26:22"
                              },
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "type": "string memory"
                                },
                                "children": [
                                  {
                                    "attributes": {
                                      "argumentTypes": null,
                                      "arguments": [
                                        null
                                      ],
                                      "isConstant": false,
                                      "isLValue": false,
                                      "isPure": false,
                                      "isStructConstructorCall": false,
                                      "lValueRequested": false,
                                      "names": [
                                        null
                                      ],
                                      "type": "string memory[10] memory",
                                      "type_conversion": false
                                    },
                                    "children": [
                                      {
                                        "attributes": {
                                          "argumentTypes": [
                                            null
                                          ],
                                          "overloadedDeclarations": [
                                            null
                                          ],
                                          "referencedDeclaration": 10123,
                                          "type": "function () returns (string memory[10] memory)",
                                          "value": "getFunctionList"
                                        },
                                        "id": 10019,
                                        "name": "Identifier",
                                        "src": "1624:15:22"
                                      }
                                    ],
                                    "id": 10020,
                                    "name": "FunctionCall",
                                    "src": "1624:17:22"
                                  },
                                  {
                                    "attributes": {
                                      "argumentTypes": null,
                                      "overloadedDeclarations": [
                                        null
                                      ],
                                      "referencedDeclaration": 10008,
                                      "type": "uint256",
                                      "value": "i"
                                    },
                                    "id": 10021,
                                    "name": "Identifier",
                                    "src": "1642:1:22"
                                  }
                                ],
                                "id": 10022,
                                "name": "IndexAccess",
                                "src": "1624:20:22"
                              }
                            ],
                            "id": 10023,
                            "name": "VariableDeclarationStatement",
                            "src": "1595:49:22"
                          },
                          {
                            "attributes": {
                              "falseBody": null
                            },
                            "children": [
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
                                  "operator": "!=",
                                  "type": "bool"
                                },
                                "children": [
                                  {
                                    "attributes": {
                                      "argumentTypes": null,
                                      "isConstant": false,
                                      "isLValue": false,
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
                                          "isLValue": false,
                                          "isPure": false,
                                          "isStructConstructorCall": false,
                                          "lValueRequested": false,
                                          "names": [
                                            null
                                          ],
                                          "type": "bytes memory",
                                          "type_conversion": true
                                        },
                                        "children": [
                                          {
                                            "attributes": {
                                              "argumentTypes": [
                                                {
                                                  "typeIdentifier": "t_string_memory_ptr",
                                                  "typeString": "string memory"
                                                }
                                              ],
                                              "isConstant": false,
                                              "isLValue": false,
                                              "isPure": true,
                                              "lValueRequested": false,
                                              "type": "type(bytes storage pointer)",
                                              "value": "bytes"
                                            },
                                            "id": 10024,
                                            "name": "ElementaryTypeNameExpression",
                                            "src": "1663:5:22"
                                          },
                                          {
                                            "attributes": {
                                              "argumentTypes": null,
                                              "overloadedDeclarations": [
                                                null
                                              ],
                                              "referencedDeclaration": 10018,
                                              "type": "string memory",
                                              "value": "functionName"
                                            },
                                            "id": 10025,
                                            "name": "Identifier",
                                            "src": "1669:12:22"
                                          }
                                        ],
                                        "id": 10026,
                                        "name": "FunctionCall",
                                        "src": "1663:19:22"
                                      }
                                    ],
                                    "id": 10027,
                                    "name": "MemberAccess",
                                    "src": "1663:26:22"
                                  },
                                  {
                                    "attributes": {
                                      "argumentTypes": null,
                                      "hexvalue": "30",
                                      "isConstant": false,
                                      "isLValue": false,
                                      "isPure": true,
                                      "lValueRequested": false,
                                      "subdenomination": null,
                                      "token": "number",
                                      "type": "int_const 0",
                                      "value": "0"
                                    },
                                    "id": 10028,
                                    "name": "Literal",
                                    "src": "1693:1:22"
                                  }
                                ],
                                "id": 10029,
                                "name": "BinaryOperation",
                                "src": "1663:31:22"
                              },
                              {
                                "children": [
                                  {
                                    "children": [
                                      {
                                        "attributes": {
                                          "assignments": [
                                            10031
                                          ]
                                        },
                                        "children": [
                                          {
                                            "attributes": {
                                              "constant": false,
                                              "name": "j",
                                              "scope": 10077,
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
                                                "id": 10030,
                                                "name": "ElementaryTypeName",
                                                "src": "1719:4:22"
                                              }
                                            ],
                                            "id": 10031,
                                            "name": "VariableDeclaration",
                                            "src": "1719:6:22"
                                          },
                                          {
                                            "attributes": {
                                              "argumentTypes": null,
                                              "hexvalue": "30",
                                              "isConstant": false,
                                              "isLValue": false,
                                              "isPure": true,
                                              "lValueRequested": false,
                                              "subdenomination": null,
                                              "token": "number",
                                              "type": "int_const 0",
                                              "value": "0"
                                            },
                                            "id": 10032,
                                            "name": "Literal",
                                            "src": "1728:1:22"
                                          }
                                        ],
                                        "id": 10033,
                                        "name": "VariableDeclarationStatement",
                                        "src": "1719:10:22"
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
                                          "operator": "<",
                                          "type": "bool"
                                        },
                                        "children": [
                                          {
                                            "attributes": {
                                              "argumentTypes": null,
                                              "overloadedDeclarations": [
                                                null
                                              ],
                                              "referencedDeclaration": 10031,
                                              "type": "uint256",
                                              "value": "j"
                                            },
                                            "id": 10034,
                                            "name": "Identifier",
                                            "src": "1731:1:22"
                                          },
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
                                                  "type": "bytes32[] storage ref"
                                                },
                                                "children": [
                                                  {
                                                    "attributes": {
                                                      "argumentTypes": null,
                                                      "overloadedDeclarations": [
                                                        null
                                                      ],
                                                      "referencedDeclaration": 9951,
                                                      "type": "mapping(string memory => bytes32[] storage ref)",
                                                      "value": "functionCallSignatures"
                                                    },
                                                    "id": 10035,
                                                    "name": "Identifier",
                                                    "src": "1735:22:22"
                                                  },
                                                  {
                                                    "attributes": {
                                                      "argumentTypes": null,
                                                      "overloadedDeclarations": [
                                                        null
                                                      ],
                                                      "referencedDeclaration": 10018,
                                                      "type": "string memory",
                                                      "value": "functionName"
                                                    },
                                                    "id": 10036,
                                                    "name": "Identifier",
                                                    "src": "1758:12:22"
                                                  }
                                                ],
                                                "id": 10037,
                                                "name": "IndexAccess",
                                                "src": "1735:36:22"
                                              }
                                            ],
                                            "id": 10038,
                                            "name": "MemberAccess",
                                            "src": "1735:43:22"
                                          }
                                        ],
                                        "id": 10039,
                                        "name": "BinaryOperation",
                                        "src": "1731:47:22"
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
                                              "operator": "++",
                                              "prefix": false,
                                              "type": "uint256"
                                            },
                                            "children": [
                                              {
                                                "attributes": {
                                                  "argumentTypes": null,
                                                  "overloadedDeclarations": [
                                                    null
                                                  ],
                                                  "referencedDeclaration": 10031,
                                                  "type": "uint256",
                                                  "value": "j"
                                                },
                                                "id": 10040,
                                                "name": "Identifier",
                                                "src": "1780:1:22"
                                              }
                                            ],
                                            "id": 10041,
                                            "name": "UnaryOperation",
                                            "src": "1780:3:22"
                                          }
                                        ],
                                        "id": 10042,
                                        "name": "ExpressionStatement",
                                        "src": "1780:3:22"
                                      },
                                      {
                                        "children": [
                                          {
                                            "attributes": {
                                              "assignments": [
                                                10044
                                              ]
                                            },
                                            "children": [
                                              {
                                                "attributes": {
                                                  "constant": false,
                                                  "name": "callSignature",
                                                  "scope": 10077,
                                                  "stateVariable": false,
                                                  "storageLocation": "default",
                                                  "type": "bytes32",
                                                  "value": null,
                                                  "visibility": "internal"
                                                },
                                                "children": [
                                                  {
                                                    "attributes": {
                                                      "name": "bytes32",
                                                      "type": "bytes32"
                                                    },
                                                    "id": 10043,
                                                    "name": "ElementaryTypeName",
                                                    "src": "1807:7:22"
                                                  }
                                                ],
                                                "id": 10044,
                                                "name": "VariableDeclaration",
                                                "src": "1807:21:22"
                                              },
                                              {
                                                "attributes": {
                                                  "argumentTypes": null,
                                                  "isConstant": false,
                                                  "isLValue": true,
                                                  "isPure": false,
                                                  "lValueRequested": false,
                                                  "type": "bytes32"
                                                },
                                                "children": [
                                                  {
                                                    "attributes": {
                                                      "argumentTypes": null,
                                                      "isConstant": false,
                                                      "isLValue": true,
                                                      "isPure": false,
                                                      "lValueRequested": false,
                                                      "type": "bytes32[] storage ref"
                                                    },
                                                    "children": [
                                                      {
                                                        "attributes": {
                                                          "argumentTypes": null,
                                                          "overloadedDeclarations": [
                                                            null
                                                          ],
                                                          "referencedDeclaration": 9951,
                                                          "type": "mapping(string memory => bytes32[] storage ref)",
                                                          "value": "functionCallSignatures"
                                                        },
                                                        "id": 10045,
                                                        "name": "Identifier",
                                                        "src": "1831:22:22"
                                                      },
                                                      {
                                                        "attributes": {
                                                          "argumentTypes": null,
                                                          "overloadedDeclarations": [
                                                            null
                                                          ],
                                                          "referencedDeclaration": 10018,
                                                          "type": "string memory",
                                                          "value": "functionName"
                                                        },
                                                        "id": 10046,
                                                        "name": "Identifier",
                                                        "src": "1854:12:22"
                                                      }
                                                    ],
                                                    "id": 10047,
                                                    "name": "IndexAccess",
                                                    "src": "1831:36:22"
                                                  },
                                                  {
                                                    "attributes": {
                                                      "argumentTypes": null,
                                                      "overloadedDeclarations": [
                                                        null
                                                      ],
                                                      "referencedDeclaration": 10031,
                                                      "type": "uint256",
                                                      "value": "j"
                                                    },
                                                    "id": 10048,
                                                    "name": "Identifier",
                                                    "src": "1868:1:22"
                                                  }
                                                ],
                                                "id": 10049,
                                                "name": "IndexAccess",
                                                "src": "1831:39:22"
                                              }
                                            ],
                                            "id": 10050,
                                            "name": "VariableDeclarationStatement",
                                            "src": "1807:63:22"
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
                                                          "type": "mapping(bytes32 => bool)"
                                                        },
                                                        "children": [
                                                          {
                                                            "attributes": {
                                                              "argumentTypes": null,
                                                              "overloadedDeclarations": [
                                                                null
                                                              ],
                                                              "referencedDeclaration": 9963,
                                                              "type": "mapping(string memory => mapping(bytes32 => bool))",
                                                              "value": "functionCalls"
                                                            },
                                                            "id": 10051,
                                                            "name": "Identifier",
                                                            "src": "1899:13:22"
                                                          },
                                                          {
                                                            "attributes": {
                                                              "argumentTypes": null,
                                                              "overloadedDeclarations": [
                                                                null
                                                              ],
                                                              "referencedDeclaration": 10018,
                                                              "type": "string memory",
                                                              "value": "functionName"
                                                            },
                                                            "id": 10052,
                                                            "name": "Identifier",
                                                            "src": "1913:12:22"
                                                          }
                                                        ],
                                                        "id": 10053,
                                                        "name": "IndexAccess",
                                                        "src": "1899:27:22"
                                                      },
                                                      {
                                                        "attributes": {
                                                          "argumentTypes": null,
                                                          "overloadedDeclarations": [
                                                            null
                                                          ],
                                                          "referencedDeclaration": 10044,
                                                          "type": "bytes32",
                                                          "value": "callSignature"
                                                        },
                                                        "id": 10054,
                                                        "name": "Identifier",
                                                        "src": "1927:13:22"
                                                      }
                                                    ],
                                                    "id": 10055,
                                                    "name": "IndexAccess",
                                                    "src": "1899:42:22"
                                                  }
                                                ],
                                                "id": 10056,
                                                "name": "UnaryOperation",
                                                "src": "1892:49:22"
                                              }
                                            ],
                                            "id": 10057,
                                            "name": "ExpressionStatement",
                                            "src": "1892:49:22"
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
                                                      "type": "bytes32"
                                                    },
                                                    "children": [
                                                      {
                                                        "attributes": {
                                                          "argumentTypes": null,
                                                          "isConstant": false,
                                                          "isLValue": true,
                                                          "isPure": false,
                                                          "lValueRequested": false,
                                                          "type": "mapping(bytes32 => bytes32)"
                                                        },
                                                        "children": [
                                                          {
                                                            "attributes": {
                                                              "argumentTypes": null,
                                                              "overloadedDeclarations": [
                                                                null
                                                              ],
                                                              "referencedDeclaration": 9957,
                                                              "type": "mapping(string memory => mapping(bytes32 => bytes32))",
                                                              "value": "mockedReturnValue"
                                                            },
                                                            "id": 10058,
                                                            "name": "Identifier",
                                                            "src": "1970:17:22"
                                                          },
                                                          {
                                                            "attributes": {
                                                              "argumentTypes": null,
                                                              "overloadedDeclarations": [
                                                                null
                                                              ],
                                                              "referencedDeclaration": 10018,
                                                              "type": "string memory",
                                                              "value": "functionName"
                                                            },
                                                            "id": 10059,
                                                            "name": "Identifier",
                                                            "src": "1988:12:22"
                                                          }
                                                        ],
                                                        "id": 10060,
                                                        "name": "IndexAccess",
                                                        "src": "1970:31:22"
                                                      },
                                                      {
                                                        "attributes": {
                                                          "argumentTypes": null,
                                                          "overloadedDeclarations": [
                                                            null
                                                          ],
                                                          "referencedDeclaration": 10044,
                                                          "type": "bytes32",
                                                          "value": "callSignature"
                                                        },
                                                        "id": 10061,
                                                        "name": "Identifier",
                                                        "src": "2002:13:22"
                                                      }
                                                    ],
                                                    "id": 10062,
                                                    "name": "IndexAccess",
                                                    "src": "1970:46:22"
                                                  }
                                                ],
                                                "id": 10063,
                                                "name": "UnaryOperation",
                                                "src": "1963:53:22"
                                              }
                                            ],
                                            "id": 10064,
                                            "name": "ExpressionStatement",
                                            "src": "1963:53:22"
                                          }
                                        ],
                                        "id": 10065,
                                        "name": "Block",
                                        "src": "1785:250:22"
                                      }
                                    ],
                                    "id": 10066,
                                    "name": "ForStatement",
                                    "src": "1714:321:22"
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
                                              "type": "bytes32[] storage ref"
                                            },
                                            "children": [
                                              {
                                                "attributes": {
                                                  "argumentTypes": null,
                                                  "overloadedDeclarations": [
                                                    null
                                                  ],
                                                  "referencedDeclaration": 9951,
                                                  "type": "mapping(string memory => bytes32[] storage ref)",
                                                  "value": "functionCallSignatures"
                                                },
                                                "id": 10067,
                                                "name": "Identifier",
                                                "src": "2060:22:22"
                                              },
                                              {
                                                "attributes": {
                                                  "argumentTypes": null,
                                                  "overloadedDeclarations": [
                                                    null
                                                  ],
                                                  "referencedDeclaration": 10018,
                                                  "type": "string memory",
                                                  "value": "functionName"
                                                },
                                                "id": 10068,
                                                "name": "Identifier",
                                                "src": "2083:12:22"
                                              }
                                            ],
                                            "id": 10069,
                                            "name": "IndexAccess",
                                            "src": "2060:36:22"
                                          }
                                        ],
                                        "id": 10070,
                                        "name": "UnaryOperation",
                                        "src": "2053:43:22"
                                      }
                                    ],
                                    "id": 10071,
                                    "name": "ExpressionStatement",
                                    "src": "2053:43:22"
                                  }
                                ],
                                "id": 10072,
                                "name": "Block",
                                "src": "1696:415:22"
                              }
                            ],
                            "id": 10073,
                            "name": "IfStatement",
                            "src": "1659:452:22"
                          }
                        ],
                        "id": 10074,
                        "name": "Block",
                        "src": "1581:540:22"
                      }
                    ],
                    "id": 10075,
                    "name": "ForStatement",
                    "src": "1551:570:22"
                  }
                ],
                "id": 10076,
                "name": "Block",
                "src": "1541:586:22"
              }
            ],
            "id": 10077,
            "name": "FunctionDefinition",
            "src": "1517:610:22"
          },
          {
            "attributes": {
              "constant": false,
              "implemented": true,
              "isConstructor": false,
              "modifiers": [
                null
              ],
              "name": "functionCalledWithArgs",
              "payable": false,
              "scope": 10124,
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
                      "name": "functionName",
                      "scope": 10100,
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
                        "id": 10078,
                        "name": "ElementaryTypeName",
                        "src": "2165:6:22"
                      }
                    ],
                    "id": 10079,
                    "name": "VariableDeclaration",
                    "src": "2165:19:22"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "name": "args",
                      "scope": 10100,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "bytes32",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "bytes32",
                          "type": "bytes32"
                        },
                        "id": 10080,
                        "name": "ElementaryTypeName",
                        "src": "2186:7:22"
                      }
                    ],
                    "id": 10081,
                    "name": "VariableDeclaration",
                    "src": "2186:12:22"
                  }
                ],
                "id": 10082,
                "name": "ParameterList",
                "src": "2164:35:22"
              },
              {
                "attributes": {
                  "parameters": [
                    null
                  ]
                },
                "children": [],
                "id": 10083,
                "name": "ParameterList",
                "src": "2221:0:22"
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
                                  "type": "mapping(bytes32 => bool)"
                                },
                                "children": [
                                  {
                                    "attributes": {
                                      "argumentTypes": null,
                                      "overloadedDeclarations": [
                                        null
                                      ],
                                      "referencedDeclaration": 9963,
                                      "type": "mapping(string memory => mapping(bytes32 => bool))",
                                      "value": "functionCalls"
                                    },
                                    "id": 10084,
                                    "name": "Identifier",
                                    "src": "2231:13:22"
                                  },
                                  {
                                    "attributes": {
                                      "argumentTypes": null,
                                      "overloadedDeclarations": [
                                        null
                                      ],
                                      "referencedDeclaration": 10079,
                                      "type": "string memory",
                                      "value": "functionName"
                                    },
                                    "id": 10085,
                                    "name": "Identifier",
                                    "src": "2245:12:22"
                                  }
                                ],
                                "id": 10087,
                                "name": "IndexAccess",
                                "src": "2231:27:22"
                              },
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 10081,
                                  "type": "bytes32",
                                  "value": "args"
                                },
                                "id": 10086,
                                "name": "Identifier",
                                "src": "2259:4:22"
                              }
                            ],
                            "id": 10088,
                            "name": "IndexAccess",
                            "src": "2231:33:22"
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
                            "id": 10089,
                            "name": "Literal",
                            "src": "2267:4:22"
                          }
                        ],
                        "id": 10090,
                        "name": "Assignment",
                        "src": "2231:40:22"
                      }
                    ],
                    "id": 10091,
                    "name": "ExpressionStatement",
                    "src": "2231:40:22"
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
                                  "typeIdentifier": "t_bytes32",
                                  "typeString": "bytes32"
                                }
                              ],
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "member_name": "push",
                              "referencedDeclaration": null,
                              "type": "function (bytes32) returns (uint256)"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "isConstant": false,
                                  "isLValue": true,
                                  "isPure": false,
                                  "lValueRequested": false,
                                  "type": "bytes32[] storage ref"
                                },
                                "children": [
                                  {
                                    "attributes": {
                                      "argumentTypes": null,
                                      "overloadedDeclarations": [
                                        null
                                      ],
                                      "referencedDeclaration": 9951,
                                      "type": "mapping(string memory => bytes32[] storage ref)",
                                      "value": "functionCallSignatures"
                                    },
                                    "id": 10092,
                                    "name": "Identifier",
                                    "src": "2281:22:22"
                                  },
                                  {
                                    "attributes": {
                                      "argumentTypes": null,
                                      "overloadedDeclarations": [
                                        null
                                      ],
                                      "referencedDeclaration": 10079,
                                      "type": "string memory",
                                      "value": "functionName"
                                    },
                                    "id": 10093,
                                    "name": "Identifier",
                                    "src": "2304:12:22"
                                  }
                                ],
                                "id": 10094,
                                "name": "IndexAccess",
                                "src": "2281:36:22"
                              }
                            ],
                            "id": 10095,
                            "name": "MemberAccess",
                            "src": "2281:41:22"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 10081,
                              "type": "bytes32",
                              "value": "args"
                            },
                            "id": 10096,
                            "name": "Identifier",
                            "src": "2323:4:22"
                          }
                        ],
                        "id": 10097,
                        "name": "FunctionCall",
                        "src": "2281:47:22"
                      }
                    ],
                    "id": 10098,
                    "name": "ExpressionStatement",
                    "src": "2281:47:22"
                  }
                ],
                "id": 10099,
                "name": "Block",
                "src": "2221:114:22"
              }
            ],
            "id": 10100,
            "name": "FunctionDefinition",
            "src": "2133:202:22"
          },
          {
            "attributes": {
              "constant": true,
              "implemented": true,
              "isConstructor": false,
              "modifiers": [
                null
              ],
              "name": "wasFunctionCalledWithArgs",
              "payable": false,
              "scope": 10124,
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
                      "name": "functionName",
                      "scope": 10116,
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
                        "id": 10101,
                        "name": "ElementaryTypeName",
                        "src": "2376:6:22"
                      }
                    ],
                    "id": 10102,
                    "name": "VariableDeclaration",
                    "src": "2376:19:22"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "name": "args",
                      "scope": 10116,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "bytes32",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "bytes32",
                          "type": "bytes32"
                        },
                        "id": 10103,
                        "name": "ElementaryTypeName",
                        "src": "2397:7:22"
                      }
                    ],
                    "id": 10104,
                    "name": "VariableDeclaration",
                    "src": "2397:12:22"
                  }
                ],
                "id": 10105,
                "name": "ParameterList",
                "src": "2375:35:22"
              },
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "name": "wasCalled",
                      "scope": 10116,
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
                        "id": 10106,
                        "name": "ElementaryTypeName",
                        "src": "2458:4:22"
                      }
                    ],
                    "id": 10107,
                    "name": "VariableDeclaration",
                    "src": "2458:14:22"
                  }
                ],
                "id": 10108,
                "name": "ParameterList",
                "src": "2457:16:22"
              },
              {
                "children": [
                  {
                    "attributes": {
                      "functionReturnParameters": 10108
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
                              "type": "mapping(bytes32 => bool)"
                            },
                            "children": [
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 9963,
                                  "type": "mapping(string memory => mapping(bytes32 => bool))",
                                  "value": "functionCalls"
                                },
                                "id": 10109,
                                "name": "Identifier",
                                "src": "2495:13:22"
                              },
                              {
                                "attributes": {
                                  "argumentTypes": null,
                                  "overloadedDeclarations": [
                                    null
                                  ],
                                  "referencedDeclaration": 10102,
                                  "type": "string memory",
                                  "value": "functionName"
                                },
                                "id": 10110,
                                "name": "Identifier",
                                "src": "2509:12:22"
                              }
                            ],
                            "id": 10111,
                            "name": "IndexAccess",
                            "src": "2495:27:22"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "overloadedDeclarations": [
                                null
                              ],
                              "referencedDeclaration": 10104,
                              "type": "bytes32",
                              "value": "args"
                            },
                            "id": 10112,
                            "name": "Identifier",
                            "src": "2523:4:22"
                          }
                        ],
                        "id": 10113,
                        "name": "IndexAccess",
                        "src": "2495:33:22"
                      }
                    ],
                    "id": 10114,
                    "name": "Return",
                    "src": "2488:40:22"
                  }
                ],
                "id": 10115,
                "name": "Block",
                "src": "2478:57:22"
              }
            ],
            "id": 10116,
            "name": "FunctionDefinition",
            "src": "2341:194:22"
          },
          {
            "attributes": {
              "body": null,
              "constant": false,
              "implemented": false,
              "isConstructor": false,
              "modifiers": [
                null
              ],
              "name": "getFunctionList",
              "payable": false,
              "scope": 10124,
              "stateMutability": "nonpayable",
              "superFunction": null,
              "visibility": "internal"
            },
            "children": [
              {
                "attributes": {
                  "parameters": [
                    null
                  ]
                },
                "children": [],
                "id": 10117,
                "name": "ParameterList",
                "src": "2565:2:22"
              },
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "name": "functionNames",
                      "scope": 10123,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "string memory[10] memory",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "type": "string storage ref[10] storage pointer"
                        },
                        "children": [
                          {
                            "attributes": {
                              "name": "string",
                              "type": "string storage pointer"
                            },
                            "id": 10118,
                            "name": "ElementaryTypeName",
                            "src": "2586:6:22"
                          },
                          {
                            "attributes": {
                              "argumentTypes": null,
                              "hexvalue": "3130",
                              "isConstant": false,
                              "isLValue": false,
                              "isPure": false,
                              "lValueRequested": false,
                              "subdenomination": null,
                              "token": "number",
                              "type": "int_const 10",
                              "value": "10"
                            },
                            "id": 10119,
                            "name": "Literal",
                            "src": "2593:2:22"
                          }
                        ],
                        "id": 10120,
                        "name": "ArrayTypeName",
                        "src": "2586:10:22"
                      }
                    ],
                    "id": 10121,
                    "name": "VariableDeclaration",
                    "src": "2586:24:22"
                  }
                ],
                "id": 10122,
                "name": "ParameterList",
                "src": "2585:26:22"
              }
            ],
            "id": 10123,
            "name": "FunctionDefinition",
            "src": "2541:71:22"
          }
        ],
        "id": 10124,
        "name": "ContractDefinition",
        "src": "610:2004:22"
      }
    ],
    "id": 10125,
    "name": "SourceUnit",
    "src": "584:2031:22"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.18+commit.9cf6e910.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "1.0.1",
  "updatedAt": "2018-08-31T01:05:16.993Z"
}