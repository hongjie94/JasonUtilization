/**** mutiple plan  ****
Business Management (A.A.S.) 
Nursing (A.A.S.)
Accounting for Forensic Accounting (A.S.)
Mathematics and Sciences for Secondary Education (A.S.)
Music (A.S.)


**** No plan  ****
Critical Thinking and Justice (A.A.) (PLAN N/A)
Modern Languages: Spanish Translation and Interpretation (A.A.) (PLAN N/A)
Urban Studies (A.A.) (PLAN N/A)
Accounting Certificate Program (ACP) (PLAN N/A)
Health Informatics Certificate PLAN N/A)
Spanish Translation Certificate PLAN N/A)
Cyber-Security Micro-credential
** ** ** ** ** ** ** **
*/

const writeJson = require('write-json'); 
const data = require('./data.json');
const majorDatas = require('./majorDatas.json');
const dialog_nodes =(data.dialog_nodes);
// console.log(data2.length); // 9 + 26 + 22 + 3 +1 = 61

 dialog_nodes.map(node  => {
  majorDatas.forEach(majorData => {
    if (majorData.title === node.title) {
      const nodeIndex = dialog_nodes.indexOf(node);
      const majorOutputResponse = "You can learn more about"+ majorData.name +"at the link below";
      const careerMaps_dialogNode = "node_1_165129".concat(3234560 + nodeIndex);
      const academicMaps_dialogNode = "node_7_165127".concat(4023456 + nodeIndex);
      const jumpToAcademicMaps_dialogNode = "node_3_165127".concat(5023456 + nodeIndex);
      const jumpToCaeerMap_dialogNode = "node_2_165129".concat(1023456 + nodeIndex);
      const No_dialogNode = "node_8_165129".concat(2023456 + nodeIndex);
      const academicMapsPlanText = `\n\n[ ${majorData.title} 2 Year Plan](${majorData.academicMap2YearPlan}) \n\n[ ${majorData.title}  5 Semester Plan](${majorData.academicMap2YearPlan})\n\n\n`;
      
      const majorOutput =  {
        "type": "standard",
        "title": node.title,
        "output": {
          "generic": [
            {
              "values": [
                {
                  "text": majorOutputResponse
                }
              ],
              "response_type": "text",
              "selection_policy": "sequential"
            },
            {
              "values": [
                {
                  "text": majorData.detailLink
                }
              ],
              "response_type": "text",
              "selection_policy": "sequential"
            },
            {
              "values": [
                {
                  "text": "Explore Career Map and/or Academic Roadmaps?"
                },
                {
                  "text": "Did you want to see the Career Map or the Academic Roadmap?"
                }
              ],
              "response_type": "text",
              "selection_policy": "random"
            },
            {
              "title": "",
              "options": [
                {
                  "label": "Career map",
                  "value": {
                    "input": {
                      "text": "Career map"
                    }
                  }
                },
                {
                  "label": "Academic map",
                  "value": {
                    "input": {
                      "text": "Academic map"
                    }
                  }
                }
              ],
              "description": "",
              "response_type": "option"
            }
          ]
        },
        "parent": node.parent,  
        "conditions": node.conditions,
        "dialog_node": node.dialog_node
      };

      const careerMaps = {
        "type": "standard",
        "output": {
          "generic": [
            {
              "values": [
                {
                  "text": "You can view the Career Map at the link below"
                },
                {
                  "text": "Okay, Career Maps. You can view that at the link below"
                }
              ],
              "response_type": "text",
              "selection_policy": "sequential"
            },
            {
              "values": [
                {
                  "text": majorData.careerMap
                }
              ],
              "response_type": "text",
              "selection_policy": "sequential"
            },
            {
              "values": [
                {
                  "text": "What else can I help you with?\n(Try asking me about what kind of degrees are offered at BMCC)"
                }
              ],
              "response_type": "text",
              "selection_policy": "sequential"
            }
          ]
        },
        "parent":  majorData.node_id,
        "conditions": "#career_maps || #Yes",
        "dialog_node": careerMaps_dialogNode
      };

      const jumpToAcademicMaps =  {
        "type": "standard",
        "parent": careerMaps_dialogNode, //career_maps_dialogNode,
        "next_step": {
          "behavior": "jump_to",
          "selector": "condition",
          "dialog_node": academicMaps_dialogNode //academicMaps_dialogNode,
        },
        "conditions": "#academic_maps",
        "dialog_node": jumpToCaeerMap_dialogNode // jumpToCaeerMap_dialogNode
      };

      const academicMaps =  {
        "type": "standard",
        "output": {
          "generic": [
            {
              "values": [
                {
                  "text": "Academic Maps? Sure. There are two options to choose from:"
                },
                {
                  "text": "View the Roadmaps here:"
                }
              ],
              "response_type": "text",
              "selection_policy": "random"
            },
            {
              "values": [
                {
                  "text": academicMapsPlanText
                }
              ],
              "response_type": "text",
              "selection_policy": "sequential"
            },
            {
              "values": [
                {
                  "text": "\nWhat else can I help you with?\n(Try asking me about what kind of degrees are offered at BMCC)"
                }
              ],
              "response_type": "text",
              "selection_policy": "sequential"
            }
          ]
        },
        "parent": majorData.node_id,
        "conditions": "#academic_maps || #Yes",
        "dialog_node": academicMaps_dialogNode,
        "previous_sibling": careerMaps_dialogNode
      };

      const jumpToCaeerMap = {
        "type": "standard",
        "parent": academicMaps_dialogNode, // academicMaps_dialogNode,
        "next_step": {
          "behavior": "jump_to",
          "selector": "condition",
          "dialog_node": careerMaps_dialogNode//career_maps_dialogNode,
        },
        "conditions": "#career_maps",
        "dialog_node": jumpToAcademicMaps_dialogNode //jumpToAcademicMaps_dialogNode
      };

      const No = {
        "type": "standard",
        "output": {
          "generic": [
            {
              "values": [
                {
                  "text": "What else can I help you with?\n(Try asking me about what kind of degrees are offered at BMCC)"
                }
              ],
              "response_type": "text",
              "selection_policy": "sequential"
            }
          ]
        },
        "parent": node.dialog_node, //node.dialog_node
        "conditions": "#No",
        "dialog_node": No_dialogNode, //No_dialogNode
        "previous_sibling": academicMaps_dialogNode  //academicMaps_dialogNode,
      };

      dialog_nodes[nodeIndex] = majorOutput;
      dialog_nodes.push(careerMaps);
      dialog_nodes.push(jumpToAcademicMaps);
      dialog_nodes.push(academicMaps);
      dialog_nodes.push(jumpToCaeerMap);
      dialog_nodes.push(No);
    } 
  }); 
});


writeJson('newData.json', data, (err) => {
  if(err) {
    console.log(err);
  } else {
    console.log(`Json File Complete!`);
  }
});



