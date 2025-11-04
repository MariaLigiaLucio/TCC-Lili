export default interface ManutencaoType {
    id: string;
    veiculo_id: string;
    data: string;
    tipo: string;
    custo: number;
    veiculo?: VeiculoType;
}