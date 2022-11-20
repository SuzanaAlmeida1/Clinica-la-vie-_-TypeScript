import Atendimento from './Atendimento';
import Psicologos from './Psicologos';
import Pacientes from './Pacientes';

Pacientes.hasMany(Atendimento,{
    constraint: true,
    foreignKey: 'id_paciente',
    as: 'atendimentos'
});

Atendimento.belongsTo(Pacientes,{
    constraint: true,
    foreignKey: 'id_paciente',
    as: 'pacientes'
});

Atendimento.belongsTo(Psicologos,{
    constraint: true,
    foreignKey: 'id_psicologo',
    as: 'psicologos'
});

Psicologos.hasMany(Atendimento,{
    constraint: true,
    foreignKey: 'id_psicologo',
    as: 'atendimentos'
});

export {
    Atendimento,
    Pacientes,
    Psicologos
};