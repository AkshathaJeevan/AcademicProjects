package assignment3;


import java.io.File;
import java.util.Scanner;

public class Turtle{

	
	public static void main(String[] args) {

        try {
        		Expression expression;
            	File file = new File("/Users/kshug1/Documents/commands.txt");
            	Scanner  scanner = new Scanner(file);
            	while (scanner.hasNextLine() ) {
                String turtle = scanner.nextLine();
                String[] details = turtle.split(" ");
                String command = details[0]; 
                int input = Integer.parseInt(details[1]);
                if(command.equalsIgnoreCase("move")) {
                	expression = new MoveExpression(input);
                
                }
                if(command.contains("turn")) {
                	expression = new TurnExpression(input);
                }
                if(command.contains("penDown")) {
                	expression = new PenDownExpression();
                }
                if(command.contains("penUP")) {
                	expression = new PenUpExpression();
                 }
                if(command.contains("repeat")) {
                	expression = new RepeatExpression();
                 }
               
           }
         
            	scanner.close();
            	
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }
	
}

