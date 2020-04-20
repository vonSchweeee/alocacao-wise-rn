import React, { Component } from 'react';
import { View, StyleSheet, Text, Picker, TouchableOpacity,  } from 'react-native';
import { TextInput, Button} from 'react-native-paper';
import { NavigationProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { bindActionCreators, ActionCreator } from 'redux';
import { connect } from 'react-redux';
import Popover from 'react-native-popover-view';

type Props = {
    navigation: NavigationProp<any>;
    login: ActionCreator<any>;
}

type State = {
    organizacoes: Array<any>;
    organizacao: string;
    tipo: 'M' | 'F';
    popUpVisible: boolean;
}

class Registro extends Component<Props, State> {
    refInfo: any

    constructor(props: Props){
        super(props);
        this.refInfo = React.createRef();
        this.state = {
            organizacoes: [{nome: 'Senai', id:'senai'}, {nome: 'Senai Portão', id: 'senaip'}],
            organizacao: '',
            tipo: 'M',
            popUpVisible: false
        }
    }

    handleLogin = () => {
        this.props.login();
    }

    renderItems: any = () => {
        return this.state.organizacoes.map(organizacao => <Picker.Item label={organizacao.nome} value={organizacao.id} key={organizacao.id}/>);
    }


    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Wise</Text>
                <View style={styles.topView}/>
                <TextInput mode='outlined' label='Nome' style={styles.input}/>
                <TextInput mode='outlined' label='E-mail' style={styles.input}/>
                <TextInput mode='outlined' label='Senha' style={styles.input}/>
                <Popover mode='tooltip' isVisible={this.state.popUpVisible} fromView={this.refInfo.current} placement='bottom' >
                    <Text>Selecione o tipo da sua organização.</Text>
                </Popover>
                <View style={styles.rowContainer}>
                {this.state.tipo === 'F' ? (
                    <>
                        <TouchableOpacity style={{marginLeft: 12}} onPress={() => this.setState({tipo: 'M'})}>
                            <Icon solid  name='chevron-circle-left' color='#B00' size={42}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={{paddingRight: 8, marginLeft: 58}} onPress={() => this.setState({popUpVisible: ! this.state.popUpVisible})}>
                            <Icon solid  name='question-circle' color='#444' size={27} ref={this.refInfo}/>
                        </TouchableOpacity>
                        <View style={styles.pickerStyle}>
                            <Picker mode='dropdown' style={styles.picker}
                                onValueChange={(val, ind) => this.setState({organizacao: val})} 
                                selectedValue={this.state.organizacao}
                            >
                                {this.renderItems()}
                            </Picker>
                            <View style={styles.censura}/>
                            <Icon style={styles.iconStyle} size={20} name='store-alt'></Icon>
                        </View>
                    </>
                ) : (
                    <>
                        <TouchableOpacity style={{paddingRight: 8, marginLeft: 107}} onPress={() => this.setState({popUpVisible: ! this.state.popUpVisible})}>
                            <Icon name='question-circle' solid  color='#444' size={27} ref={this.refInfo}/>
                        </TouchableOpacity>
                        <View style={styles.pickerStyle}>
                            <Picker mode='dropdown' style={styles.picker}
                                onValueChange={(val, ind) => this.setState({tipo: val})} 
                                selectedValue={this.state.tipo}
                            >
                                <Picker.Item label='Matriz' value='M' key='M'/>
                                <Picker.Item label='Filial' value='F' key='F'/>
                            </Picker>
                            <View style={styles.censura}/>
                            <Icon style={styles.iconStyle} size={20} solid name='building'></Icon>
                        </View>
                    </>
                )}
                </View>
                <Button mode='contained' style={styles.button}>
                    <Text style={styles.buttonText}>Registrar-se</Text>
                </Button>
                <View style={styles.bottomView}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        marginHorizontal: 50
    },
    text: {
        position: "relative",
        fontSize: 65,
        fontFamily: 'sans-serif-thin',
        color: '#000'
    },
    buttonText: {
        fontSize: 16
    },
    bottomView: {
        flex: 1
    },
    topView: {
        flex: 1
    },
    input: {
        width: 330
    },
    rowContainer: {
        flexDirection: "row",
        marginTop: 10,
        alignItems: 'center'
    },
    pickerStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#777',
        borderWidth: 0.9,
        backgroundColor: '#FFF',
        marginRight: 10,
        borderRadius: 15
    },
    textFilial: {
        marginRight: 50
    },
    iconStyle: {
        position: 'absolute',
        right: 16
    },
    censura: {
        backgroundColor: 'white',
        position: "absolute",
        right: 17,
        height: 10,
        width: 10
    },
    picker: {
        height: 50, 
        width: 200
    },
    pickerTipo: {
        height: 50, 
        width: 130
    },
    button: {
        justifyContent: 'center',
        width: 180,
        height: 50,
        marginTop: 30
    }
});



const mapDispatchToProps = (dispatch: any) => bindActionCreators({}, dispatch);
export default connect(null, mapDispatchToProps)(Registro);
