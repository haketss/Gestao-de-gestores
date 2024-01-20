import { Card, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";

export function Evento(props) {
    const {
       
        formState: { Errou },
    } = useForm();
  

  
  

    function formatarData(dataString) {
        const data = new Date(dataString);

        // Obtém os componentes da data
        const dia = data.getDate().toString().padStart(2, "0");
        const mes = (data.getMonth() + 1).toString().padStart(2, "0"); // Mês é base 0
        const ano = data.getFullYear();
        const horas = data.getHours().toString().padStart(2, "0");
        const minutos = data.getMinutes().toString().padStart(2, "0");

        // Formata a data como "DD/MM/YYYY HH:mm"
        const dataFormatada = `${dia}/${mes}/${ano} ${horas}:${minutos}`;

        return dataFormatada;
    }
    return (
        <>
            <Card id="Cards" className="mb-custon p-custon bg-custon">
                <Card.Title id="chardssub">
                    <strong>Nome: {Errou} </strong>
                    {props.evento.nome}
                </Card.Title>
                <Card.Text id="chardssub">
                    <strong>Data do evento: </strong>
                    {formatarData(props.evento.data)}
                    
                </Card.Text>
                <Card.Text id="chardssub">
                <strong>Notas da reunião: </strong>
                    {props.evento.adendo}
                </Card.Text>
                <Card.Text id="chardssub">
                <strong>Gestores Requisitados</strong>
                    {props.evento.idGestor}
                </Card.Text>
               
                
                <Row xs="auto" className="d-flex"></Row>
            </Card>
        </>
    );
}
