// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as shelljs from 'shelljs'; 

let outputChannel: any;
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	let progress = vscode.window.withProgress(
				{
					location: vscode.ProgressLocation.Notification,
					title: "Running SFDX: List All Orgs"
				},
				async () => {
					// The command has been defined in the package.json file
					// Now provide the implementation of the command with registerCommand
					// The commandId parameter must match the command field in package.json
					let disposable = vscode.commands.registerCommand('extension.sfdx.force.org.list', () => {
						// The code you place here will be executed every time your command is executed
						outputChannel = outputChannel === undefined ? vscode.window.createOutputChannel("sfdx-plus") : outputChannel;
						outputChannel.show();
						shelljs.exec('sfdx force:org:list', (code, output) => {
							outputChannel.appendLine(output);
							vscode.window.showInformationMessage("SFDX+: List Orgs successfully ran");

					});
	
	});

	context.subscriptions.push(disposable);
				});

	
}

// this method is called when your extension is deactivated
export function deactivate() {}
