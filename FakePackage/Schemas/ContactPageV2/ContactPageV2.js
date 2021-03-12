define("ContactPageV2", ["ServiceHelper"], function(ServiceHelper) {
	return {
		entitySchemaName: "Contact",
		attributes: {
			"MyAttribute": {
				dependencies: [
					{
						columns: ["Name", "MobilePhone", "Email"],
						methodName: "onColumnChange"
					}
				]
			},
			"Account": {
				lookupListConfig: {	
					columns: ["Country", "Industry", "AlternativeName" ]
				}
			},
		},
		messages: {
			// Published on: ContactSectionV2.GuidedLearning
			"SectionActionClicked": {
				mode: this.Terrasoft.MessageMode.PTP,
				direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
			}
		},
		modules: /**SCHEMA_MODULES*/{}/**SCHEMA_MODULES*/,
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		businessRules: /**SCHEMA_BUSINESS_RULES*/{}/**SCHEMA_BUSINESS_RULES*/,
		methods: {

			init: function(){
				this.callParent(arguments);
				this.subscribeToMessages();
			},
			onEntityInitialized: function() {
				this.callParent(arguments);
			},
			onColumnChange: function(){
				var colChanged = arguments[1];
				var newValue = this.get(colChanged);
				//this.showInformationDialog(colChanged + " has changed: "+ newValue);
			},


			/**
			 * @inheritdoc Terrasoft.BaseSchemaViewModel#setValidationConfig
			 * @override
			 */
			setValidationConfig: function() {
				this.callParent(arguments);
				//this.addColumnValidator("Name", this.myValidator);
				//this.addColumnValidator("Email", this.myValidator);
			},

			myValidator: function() {
				var invalidMessage = "";
				var name = this.get(arguments[1].columnPath);
				if (name.length <10){
					invalidMessage = "Value is to short";
				}
				return {
					invalidMessage: invalidMessage
				};
			},

			/**
			 * Allows you to add your own custom actions
			 * @inheritdoc Terrasoft.BasePageV2#getActions
			 * @overridden
			 */
			getActions: function() {
				var actionMenuItems = this.callParent(arguments);
				
				actionMenuItems.addItem(this.getButtonMenuSeparator());
				actionMenuItems.addItem(this.getButtonMenuItem({
					"Tag": "onContBtnCLick",
					"Caption": "My Action (Page)",
					"ImageConfig": this.get("Resources.Images.CreatioCircle")
				}));
				return actionMenuItems;
			},


			onContBtnCLick: function(){


				this.doESQ();
				// if(tag === 222){
				// 	this.onAgeBtnClick();
				// } else{
				// 	this.doESQ();
				// }
			},

			doESQ: function(){
				var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {rootSchemaName: "Account"});
				esq.addColumn("Id");
				esq.addColumn("Name");
				esq.addColumn("Industry");
				esq.addColumn("AlternativeName");
				var i = 0;

				var esqFirstFilter = esq.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL, "Country.Name", "Mexico");
				var esqSecondFilter = esq.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL, "Country.Id", "e0be1264-f36b-1410-fa98-00155d043204");
				esq.filters.logicalOperation = Terrasoft.LogicalOperatorType.OR;
				esq.filters.add("esqFirstFilter", esqFirstFilter);
				esq.filters.add("esqSecondFilter", esqSecondFilter);


				esq.getEntityCollection(
					function (result) {
						if (!result.success) {
							// error processing/logging, for example
							this.showInformationDialog("Data query error");
							return;
						}
						result.collection.each(
							function (item) {
								i++;
								var name = name + " "+item.$Name;
						});
						this.showInformationDialog("Total Accounts" + i);
					},
					this
				);
			},

			subscribeToMessages: function(){
				this.sandbox.subscribe(
					"SectionActionClicked",
					function(){this.onSectionMessageReceived();},
					this, 
					["THIS_IS_MY_TAG2"]);
			},

			onSectionMessageReceived: function(){
				var id = this.$Id
				
				var yB = this.Terrasoft.MessageBoxButtons.YES;
				yB.style = "GREEN";
				
				var nB = this.Terrasoft.MessageBoxButtons.NO;
				nB.style = "RED";

				this.showConfirmationDialog(
					"ARE YOU SURE YOU WANT TO PROCEED ?",
					function (returnCode) {
						if (returnCode === this.Terrasoft.MessageBoxButtons.NO.returnCode) {
							return;
						}
						console.log("you clicked yes");
					},
					[
						//this.Terrasoft.MessageBoxButtons.NO.returnCode,
						//this.Terrasoft.MessageBoxButtons.YES.returnCode
						yB.returnCode,
						nB.returnCode
					],
					null
				);
			},
			
			onAgeBtnClick: function() {
				var name = this.get("Name");
				// Object initializing incoming parameters for the service method.
				var serviceData = {
					// The property name corresponds to the incoming parameter name of the service method.
					"p" : {
						"NameAttribute": this.$Name,
						"Email" : this.$Email
					},
					"name" : "TestName"
				};
				// Calling the web service and processing the results.
				//https://[appName].domaincom/0/rest/ClassName/MethodName
				ServiceHelper.callService("DemoWebService", "PostMethodName",
					function(response) {
						//var result = response.GetContactIdByNameResult;
						this.showInformationDialog(response);
					}, serviceData, this);
			}


		},
		dataModels: /**SCHEMA_DATA_MODELS*/{}/**SCHEMA_DATA_MODELS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "merge",
				"name": "Age",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 6,
						"row": 4
					}
				}
			},

			{
				"operation": "insert",
				"parentName": "ContactGeneralInfoBlock",
				"propertyName": "items",
				"name": "MyEmail",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 3
					},
					"bindTo": "Email"
				}
			},
			{
				// Indicates that an operation of adding an item to the page is being executed.
				"operation": "insert",
				// Metadata of the parent control item the button is added.
				"parentName": "LeftContainer",
				 // Indicates that the button is added to the control items collection
				 // of the parent item (which meta-name is specified in the parentName).
				"propertyName": "items",
				// Meta-name of the added button.
				"name": "PrimaryContactButton",
				// Supplementary properties of the item.
				"values": {
					// Type of the added item is button.
					itemType: Terrasoft.ViewItemType.BUTTON,
					style: Terrasoft.controls.ButtonEnums.style.GREEN,
					//  Binding the button title to a localizable string of the schema..
					caption: "PAGE BTN",
					// Binding the button press handler method.
					click: {bindTo: "onContBtnCLick"},
					tag: "111"
				}
			},
			{
				// Indicates that an operation of adding an item to the page is being executed.
				"operation": "insert",
				// Metadata of the parent control item the button is added.
				"parentName": "ContactGeneralInfoBlock",
				 // Indicates that the button is added to the control items collection
				 // of the parent item (which meta-name is specified in the parentName).
				"propertyName": "items",
				// Meta-name of the added button.
				"name": "PrimaryAgeButton",
				// Supplementary properties of the item.
				"values": {
					// Type of the added item is button.
					itemType: Terrasoft.ViewItemType.BUTTON,
					style: Terrasoft.controls.ButtonEnums.style.GREY,
					//  Binding the button title to a localizable string of the schema..
					caption: "AGE BTN",
					// Binding the button press handler method.
					click: {bindTo: "onAgeBtnClick"},
					tag: "222",
					"layout": {
						"colSpan": 6,
						"rowSpan": 1,
						"column": 0,
						"row": 4
					}
				}
			}
			
		]/**SCHEMA_DIFF*/
	};
});
