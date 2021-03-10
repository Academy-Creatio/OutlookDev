define("ContactPageV2", [], function() {
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
			}
		},
		modules: /**SCHEMA_MODULES*/{}/**SCHEMA_MODULES*/,
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		businessRules: /**SCHEMA_BUSINESS_RULES*/{}/**SCHEMA_BUSINESS_RULES*/,
		methods: {

			init: function(){
				this.callParent(arguments);
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
				var tag =  arguments[3];
				var id = this.$Id;
				this.showInformationDialog(id);
				//debugger;
			},

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
			
		]/**SCHEMA_DIFF*/
	};
});
